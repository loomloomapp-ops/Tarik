import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link / navigation helpers. Using these keeps the active
// language when moving between routes and when switching languages.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
