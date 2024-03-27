import type { Actions, PageServerLoad } from "./$types.js";

import { superValidate, message, fail } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { schema } from "./schema.js";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate({}, zod(schema)),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    if (!form.valid) return fail(400, { form });
    // if (!form.valid) {
    // 	return message(form, 'Invalid form!');
    // }

    return message(form, "Form posted successfully!");
  },
};
