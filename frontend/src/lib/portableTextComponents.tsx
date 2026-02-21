import type { PortableTextReactComponents } from "@portabletext/react";
import { urlFor } from "./sanity";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(820).auto("format").quality(80).url();
      return (
        <figure style={{ margin: "2rem 0" }}>
          <img
            src={url}
            alt={value.alt || ""}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-xl)",
              display: "block",
            }}
            loading="lazy"
          />
          {value.alt && (
            <figcaption
              style={{
                textAlign: "center",
                fontSize: "0.85rem",
                color: "var(--text-light)",
                marginTop: "0.5rem",
              }}
            >
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 style={{ marginTop: "2rem", marginBottom: "0.75rem" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ marginTop: "1.25rem", marginBottom: "0.5rem" }}>{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "4px solid var(--gold-500)",
          paddingLeft: "1.25rem",
          fontStyle: "italic",
          color: "var(--text-light)",
          margin: "1.5rem 0",
        }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          style={{ color: "var(--primary)", textDecoration: "underline" }}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: "0.35rem", lineHeight: 1.7 }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: "0.35rem", lineHeight: 1.7 }}>{children}</li>
    ),
  },
};
