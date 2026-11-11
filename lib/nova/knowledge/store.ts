import type { IndexFile } from "../types";
import raw from "@/nova-knowledge/index.json";

/** The index built by `npm run nova:ingest` is bundled with the server so no database is required at runtime. */
export const localIndex = raw as unknown as IndexFile;
