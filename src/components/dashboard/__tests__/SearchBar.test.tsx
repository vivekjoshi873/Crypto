import { fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from "@/components/dashboard/SearchBar";

describe("SearchBar", () => {
  it("calls onChange when typing", () => {
    const handle = jest.fn();
    render(<SearchBar value="" onChange={handle} />);
    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: "btc" },
    });
    expect(handle).toHaveBeenCalledWith("btc");
  });
});

