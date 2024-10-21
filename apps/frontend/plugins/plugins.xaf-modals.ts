import { initializeModals } from "~/components/modal";
import * as MODALS from "~/constants/constants.plates";

export default defineNuxtPlugin(() => initializeModals(MODALS));
