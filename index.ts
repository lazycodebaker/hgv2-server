import { serve } from "bun";
import api from "./api";

serve({
    fetch: api.fetch,
    port: 8787,
})