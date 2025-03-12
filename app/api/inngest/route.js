
import { serve } from "inngest/next";
  import { inngest } from "../../../inngest/client";
// import { createuser, helloWorld } from "../../../inngest/functions";
// import { inngest } from "@/inngest/client";
import { createuser, helloWorld,generatenotes } from "@/inngest/functions";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    createuser,
    generatenotes
  ],
});
