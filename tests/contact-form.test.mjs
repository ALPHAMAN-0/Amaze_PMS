// Contact form state machine: field validators and reducer transitions.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  initialState,
  reducer,
  validateAll,
  validateField,
} from "@/components/sections/contact/ContactForm";

const valid = {
  name: "Asha Rao",
  email: "asha.rao@example.com",
  phone: "+91 98765 43210",
  propertyType: "IT Park / Commercial",
  sqft: "120,000",
  services: ["Security"],
  message: "",
};
const withField = (field, value) => ({ ...valid, [field]: value });
const accepts = (field, value) => assert.equal(validateField(field, withField(field, value)), undefined, `${field}=${JSON.stringify(value)} should pass`);
const rejects = (field, value) => assert.equal(typeof validateField(field, withField(field, value)), "string", `${field}=${JSON.stringify(value)} should fail`);

describe("contact form validators", () => {
  it("requires a name of at least two non-space characters", () => {
    ["", " ", "A", "  A  "].forEach((value) => rejects("name", value));
    ["Al", "  Asha Rao  "].forEach((value) => accepts("name", value));
  });

  it("accepts well-formed emails only", () => {
    ["a@b.co", " asha.rao@example.com "].forEach((value) => accepts("email", value));
    ["", "asha", "asha@example", "asha@example.c", "@example.com", "asha rao@example.com", "asha@exa mple.com"].forEach(
      (value) => rejects("email", value)
    );
  });

  it("accepts Indian mobile numbers with optional +91, spaces and dashes", () => {
    ["9876543210", "+919876543210", "98765 43210", "98765-43210", "+91 98765-43210"].forEach((value) =>
      accepts("phone", value)
    );
  });

  it("rejects malformed or padded phone numbers", () => {
    ["", "12345", "1234567890", "5876543210", "98765432101", "+929876543210", "98765abcde", "9876543210<script>", "9876543210\n9876543210"].forEach(
      (value) => rejects("phone", value)
    );
  });

  it("requires a property type and at least one service", () => {
    rejects("propertyType", "");
    accepts("propertyType", "Other");
    rejects("services", []);
    accepts("services", ["Parking", "Help Desk"]);
  });

  it("requires a positive, finite area and tolerates thousands separators", () => {
    ["500", "12,000", "1,20,000", "2500.5"].forEach((value) => accepts("sqft", value));
    ["", " ", "0", "-5", "abc", "12 000 sq ft", "1e999", "NaN"].forEach((value) => rejects("sqft", value));
  });

  it("treats the message as optional", () => {
    accepts("message", "");
    accepts("message", "<b>call me</b>");
  });

  it("validateAll reports every required field on an empty form and none on a valid one", () => {
    assert.deepEqual(Object.keys(validateAll(initialState.values)).sort(), [
      "email",
      "name",
      "phone",
      "propertyType",
      "services",
      "sqft",
    ]);
    assert.deepEqual(validateAll(valid), {});
  });
});

describe("contact form reducer", () => {
  it("does not show an error for a field the user has not left yet", () => {
    const state = reducer(initialState, { type: "SET_FIELD", field: "email", value: "not-an-email" });
    assert.equal(state.values.email, "not-an-email");
    assert.deepEqual(state.errors, {});
  });

  it("validates on blur, then re-validates live and clears the error once fixed", () => {
    let state = reducer(initialState, { type: "SET_FIELD", field: "email", value: "not-an-email" });
    state = reducer(state, { type: "BLUR_FIELD", field: "email" });
    assert.equal(state.touched.email, true);
    assert.equal(typeof state.errors.email, "string");
    state = reducer(state, { type: "SET_FIELD", field: "email", value: "asha@example.com" });
    assert.equal(state.errors.email, undefined);
  });

  it("toggles services on and off and clears the services error", () => {
    let state = reducer(initialState, { type: "SUBMIT_INVALID", errors: validateAll(initialState.values) });
    assert.equal(typeof state.errors.services, "string");
    state = reducer(state, { type: "TOGGLE_SERVICE", service: "Security" });
    assert.deepEqual(state.values.services, ["Security"]);
    assert.equal(state.errors.services, undefined);
    assert.equal(state.touched.services, true);
    state = reducer(state, { type: "TOGGLE_SERVICE", service: "Security" });
    assert.deepEqual(state.values.services, []);
  });

  it("marks every field touched when an invalid form is submitted", () => {
    const errors = validateAll(initialState.values);
    const state = reducer(initialState, { type: "SUBMIT_INVALID", errors });
    assert.equal(state.status, "idle");
    assert.deepEqual(state.errors, errors);
    assert.deepEqual(Object.keys(state.touched).sort(), ["email", "message", "name", "phone", "propertyType", "services", "sqft"]);
  });

  it("moves idle -> submitting -> success and resets to a clean form", () => {
    let state = reducer({ ...initialState, values: valid }, { type: "SUBMIT_START" });
    assert.equal(state.status, "submitting");
    state = reducer(state, { type: "SUBMIT_SUCCESS" });
    assert.equal(state.status, "success");
    assert.deepEqual(state.values, valid);
    assert.deepEqual(reducer(state, { type: "RESET" }), initialState);
  });

  it("never mutates the previous state and ignores unknown actions", () => {
    const before = structuredClone(initialState);
    reducer(initialState, { type: "SET_FIELD", field: "name", value: "Asha" });
    reducer(initialState, { type: "TOGGLE_SERVICE", service: "Parking" });
    reducer(initialState, { type: "BLUR_FIELD", field: "phone" });
    assert.deepEqual(initialState, before);
    assert.equal(reducer(initialState, { type: "NOT_AN_ACTION" }), initialState);
  });
});
