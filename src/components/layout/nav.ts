// Shared anchor navigation. `id` matches the section element id on the home
// page; `key` maps to the nav.* translation key.
export const navItems = [
  { id: "services", key: "services" },
  { id: "process", key: "process" },
  { id: "projects", key: "projects" },
  { id: "advantages", key: "advantages" },
  { id: "kariera", key: "careers" },
  { id: "faq", key: "faq" },
] as const;

export const CONTACT_ANCHOR = "kontakt";
