import { CardWidget } from "./CardWidget";

document.addEventListener("DOMContentLoaded", () => {
  const cardWidgetContainer = document.querySelector(".cardWidgetCont");
  const cardWidgetInstance = new CardWidget(cardWidgetContainer);
  cardWidgetInstance.bindToDOM();
});
