"use client";

import { useEffect, useReducer, useRef } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { propertyTypes } from "@/lib/data";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Form state machine — hand-rolled useReducer, no form library.      */
/* ------------------------------------------------------------------ */

const SERVICE_OPTIONS = [
  "Security",
  "Housekeeping",
  "Technical (MEP)",
  "Landscaping",
  "Pest Control",
  "Help Desk",
  "Parking",
] as const;

type TextField = "name" | "email" | "phone" | "propertyType" | "sqft" | "message";
type Field = TextField | "services";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  sqft: string;
  services: string[];
  message: string;
}

interface FormState {
  values: FormValues;
  touched: Partial<Record<Field, boolean>>;
  errors: Partial<Record<Field, string>>;
  status: "idle" | "submitting" | "success";
}

type Action =
  | { type: "SET_FIELD"; field: TextField; value: string }
  | { type: "TOGGLE_SERVICE"; service: string }
  | { type: "BLUR_FIELD"; field: Field }
  | { type: "SUBMIT_INVALID"; errors: FormState["errors"] }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "RESET" };

const initialState: FormState = {
  values: {
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    sqft: "",
    services: [],
    message: "",
  },
  touched: {},
  errors: {},
  status: "idle",
};

const INDIAN_MOBILE = /^(\+91)?[6-9]\d{9}$/;

const validators: Record<Field, (v: FormValues) => string | undefined> = {
  name: (v) => (v.name.trim().length < 2 ? "Please enter your full name." : undefined),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())
      ? undefined
      : "Enter a valid work email.",
  phone: (v) =>
    INDIAN_MOBILE.test(v.phone.replace(/[\s-]/g, ""))
      ? undefined
      : "Enter a valid Indian mobile number (10 digits, optional +91).",
  propertyType: (v) => (v.propertyType ? undefined : "Select your property type."),
  sqft: (v) => {
    const n = Number(v.sqft.replace(/,/g, ""));
    return Number.isFinite(n) && n > 0
      ? undefined
      : "Enter the approximate area in sq ft.";
  },
  services: (v) =>
    v.services.length > 0 ? undefined : "Pick at least one service.",
  message: () => undefined,
};

function validateField(field: Field, values: FormValues) {
  return validators[field](values);
}

function validateAll(values: FormValues): FormState["errors"] {
  const errors: FormState["errors"] = {};
  (Object.keys(validators) as Field[]).forEach((field) => {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  });
  return errors;
}

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD": {
      const values = { ...state.values, [action.field]: action.value };
      // live re-validate fields the user already touched
      const errors = { ...state.errors };
      if (state.touched[action.field]) {
        const error = validateField(action.field, values);
        if (error) errors[action.field] = error;
        else delete errors[action.field];
      }
      return { ...state, values, errors };
    }
    case "TOGGLE_SERVICE": {
      const selected = state.values.services.includes(action.service)
        ? state.values.services.filter((s) => s !== action.service)
        : [...state.values.services, action.service];
      const values = { ...state.values, services: selected };
      const errors = { ...state.errors };
      if (selected.length > 0) delete errors.services;
      return {
        ...state,
        values,
        errors,
        touched: { ...state.touched, services: true },
      };
    }
    case "BLUR_FIELD": {
      const error = validateField(action.field, state.values);
      const errors = { ...state.errors };
      if (error) errors[action.field] = error;
      else delete errors[action.field];
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
        errors,
      };
    }
    case "SUBMIT_INVALID":
      return {
        ...state,
        errors: action.errors,
        touched: {
          name: true,
          email: true,
          phone: true,
          propertyType: true,
          sqft: true,
          services: true,
          message: true,
        },
      };
    case "SUBMIT_START":
      return { ...state, status: "submitting" };
    case "SUBMIT_SUCCESS":
      return { ...state, status: "success" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Presentational bits                                                */
/* ------------------------------------------------------------------ */

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          id={id}
          role="alert"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="overflow-hidden text-[13px] text-[#F87171]"
        >
          <span className="block pt-1.5">{error}</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const inputClass = (hasError: boolean) =>
  cn(
    "peer w-full rounded-xl border bg-(--bg-card) px-4 pb-2.5 pt-5 text-[15px] text-primary outline-none transition-[border-color,box-shadow] duration-200 placeholder-transparent",
    hasError
      ? "border-[#F87171]/60 focus:border-[#F87171]"
      : "border-(--border-subtle) focus:border-(--accent-solid) focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)]"
  );

const labelClass =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted transition-all duration-200 peer-focus:top-3.5 peer-focus:text-[11px] peer-focus:text-(--accent-a) peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[11px]";

/* ------------------------------------------------------------------ */
/*  The form                                                           */
/* ------------------------------------------------------------------ */

export function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { values, touched, errors, status } = state;
  const formControls = useAnimationControls();
  const fieldRefs = useRef<Partial<Record<Field, HTMLElement | null>>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    const allErrors = validateAll(values);
    if (Object.keys(allErrors).length > 0) {
      dispatch({ type: "SUBMIT_INVALID", errors: allErrors });
      formControls.start({
        x: [0, -8, 8, -5, 5, 0],
        transition: { duration: 0.4 },
      });
      const first = (Object.keys(validators) as Field[]).find((f) => allErrors[f]);
      if (first) fieldRefs.current[first]?.focus?.();
      return;
    }

    dispatch({ type: "SUBMIT_START" });
    // client-side showcase only — simulate the round trip
    timerRef.current = setTimeout(() => dispatch({ type: "SUBMIT_SUCCESS" }), 1400);
  };

  const err = (field: Field) => (touched[field] ? errors[field] : undefined);

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex min-h-[540px] flex-col items-center justify-center text-center"
      >
        <svg viewBox="0 0 64 64" className="size-20" aria-hidden>
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
          <motion.path
            d="M20 33 L28.5 41.5 L45 24.5"
            fill="none"
            stroke="#34D399"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.55, ease: EASE }}
          />
        </svg>
        <h3 className="mt-7 font-display text-2xl font-semibold text-primary">
          Request received.
        </h3>
        <p className="mt-3 max-w-sm text-secondary">
          We&apos;ll call you within one business day to schedule your free site
          assessment.
        </p>
        <button
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-8 text-sm font-medium text-(--accent-a) transition-colors hover:text-primary"
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      animate={formControls}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {/* name */}
      <div>
        <div className="relative">
          <input
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
            id="cf-name"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            value={values.name}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
            }
            onBlur={() => dispatch({ type: "BLUR_FIELD", field: "name" })}
            aria-invalid={!!err("name")}
            aria-describedby={err("name") ? "cf-name-error" : undefined}
            className={inputClass(!!err("name"))}
          />
          <label htmlFor="cf-name" className={labelClass}>
            Full name
          </label>
        </div>
        <FieldError id="cf-name-error" error={err("name")} />
      </div>

      {/* email + phone */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <div className="relative">
            <input
              ref={(el) => {
                fieldRefs.current.email = el;
              }}
              id="cf-email"
              type="email"
              placeholder="Work email"
              autoComplete="email"
              value={values.email}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
              }
              onBlur={() => dispatch({ type: "BLUR_FIELD", field: "email" })}
              aria-invalid={!!err("email")}
              aria-describedby={err("email") ? "cf-email-error" : undefined}
              className={inputClass(!!err("email"))}
            />
            <label htmlFor="cf-email" className={labelClass}>
              Work email
            </label>
          </div>
          <FieldError id="cf-email-error" error={err("email")} />
        </div>
        <div>
          <div className="relative">
            <input
              ref={(el) => {
                fieldRefs.current.phone = el;
              }}
              id="cf-phone"
              type="tel"
              placeholder="Phone"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })
              }
              onBlur={() => dispatch({ type: "BLUR_FIELD", field: "phone" })}
              aria-invalid={!!err("phone")}
              aria-describedby={err("phone") ? "cf-phone-error" : undefined}
              className={inputClass(!!err("phone"))}
            />
            <label htmlFor="cf-phone" className={labelClass}>
              Phone (+91)
            </label>
          </div>
          <FieldError id="cf-phone-error" error={err("phone")} />
        </div>
      </div>

      {/* property type + size */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <div className="relative">
            <select
              ref={(el) => {
                fieldRefs.current.propertyType = el;
              }}
              id="cf-type"
              value={values.propertyType}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "propertyType",
                  value: e.target.value,
                })
              }
              onBlur={() => dispatch({ type: "BLUR_FIELD", field: "propertyType" })}
              aria-invalid={!!err("propertyType")}
              aria-describedby={err("propertyType") ? "cf-type-error" : undefined}
              className={cn(
                inputClass(!!err("propertyType")),
                "appearance-none pt-5",
                values.propertyType === "" && "text-muted"
              )}
            >
              <option value="" disabled hidden />
              {propertyTypes.map((type) => (
                <option key={type} value={type} className="bg-(--bg-raised)">
                  {type}
                </option>
              ))}
            </select>
            <label
              htmlFor="cf-type"
              className={cn(
                labelClass,
                values.propertyType !== "" && "top-3.5 text-[11px]"
              )}
            >
              Property type
            </label>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <FieldError id="cf-type-error" error={err("propertyType")} />
        </div>
        <div>
          <div className="relative">
            <input
              ref={(el) => {
                fieldRefs.current.sqft = el;
              }}
              id="cf-sqft"
              type="text"
              placeholder="Approx. area"
              inputMode="numeric"
              value={values.sqft}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "sqft", value: e.target.value })
              }
              onBlur={() => dispatch({ type: "BLUR_FIELD", field: "sqft" })}
              aria-invalid={!!err("sqft")}
              aria-describedby={err("sqft") ? "cf-sqft-error" : undefined}
              className={inputClass(!!err("sqft"))}
            />
            <label htmlFor="cf-sqft" className={labelClass}>
              Approx. area (sq ft)
            </label>
          </div>
          <FieldError id="cf-sqft-error" error={err("sqft")} />
        </div>
      </div>

      {/* services */}
      <fieldset>
        <legend className="text-sm text-secondary">
          Services you need
          <span className="ml-1.5 font-mono text-[11px] text-muted">(pick any)</span>
        </legend>
        <div
          ref={(el) => {
            fieldRefs.current.services = el;
          }}
          tabIndex={-1}
          className="mt-3 flex flex-wrap gap-2 outline-none"
          aria-describedby={err("services") ? "cf-services-error" : undefined}
        >
          {SERVICE_OPTIONS.map((service) => {
            const selected = values.services.includes(service);
            return (
              <motion.button
                key={service}
                type="button"
                whileTap={{ scale: 0.93 }}
                onClick={() => dispatch({ type: "TOGGLE_SERVICE", service })}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-xs tracking-wide transition-colors duration-200",
                  selected
                    ? "border-(--accent-solid) bg-(--accent-dim) text-(--accent-a)"
                    : "border-(--border-subtle) text-secondary hover:border-(--border-strong) hover:text-primary"
                )}
              >
                {service}
              </motion.button>
            );
          })}
        </div>
        <FieldError id="cf-services-error" error={err("services")} />
      </fieldset>

      {/* message */}
      <div className="relative">
        <textarea
          id="cf-message"
          placeholder="Anything else?"
          rows={4}
          value={values.message}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "message", value: e.target.value })
          }
          className={cn(inputClass(false), "resize-none pt-6")}
        />
        <label htmlFor="cf-message" className={cn(labelClass, "top-6")}>
          Anything else? (optional)
        </label>
      </div>

      <MagneticButton type="submit" className="w-full sm:w-auto">
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2.5">
            <span className="size-4 animate-spin rounded-full border-2 border-(--bg-base)/30 border-t-(--bg-base)" />
            Sending…
          </span>
        ) : (
          "Request my assessment"
        )}
      </MagneticButton>
    </motion.form>
  );
}
