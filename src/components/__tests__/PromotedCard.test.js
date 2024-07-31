import { screen, render } from "@testing-library/react";
import RestaurantCard, { PromotedResCard } from "../RestaurantCard";
import "@testing-library/jest-dom";
import cardData from "../mocks/promotedResCardMock.json";

it("should test the promoted restaurant card", () => {
  let PromotedCard = PromotedResCard(RestaurantCard);
  render(<PromotedCard data={cardData} />);

  let promotedLabel = screen.getAllByText(/Promoted/);
  expect(promotedLabel[0]).toBeInTheDocument();
});
