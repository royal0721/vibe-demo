import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterSelectScreen } from "./CharacterSelectScreen.jsx";

vi.mock("../services/gasApi.js", () => ({
  fetchQuestions: vi.fn(() => Promise.resolve([])),
}));

const baseState = {
  playerName: "alice",
  loadingQuestions: false,
  questionsError: null,
  selectedCharacterId: null,
};

describe("CharacterSelectScreen — 查看專區 button", () => {
  it("dispatches GO_TO_CHARACTER_QA for zero when first 查看專區 is clicked", () => {
    const dispatch = vi.fn();
    render(<CharacterSelectScreen state={baseState} dispatch={dispatch} />);
    const buttons = screen.getAllByRole("button", { name: /查看專區/ });
    fireEvent.click(buttons[0]);
    expect(dispatch).toHaveBeenCalledWith({ type: "GO_TO_CHARACTER_QA", payload: "zero" });
  });

  it("dispatches GO_TO_CHARACTER_QA for phantom when second 查看專區 is clicked", () => {
    const dispatch = vi.fn();
    render(<CharacterSelectScreen state={baseState} dispatch={dispatch} />);
    const buttons = screen.getAllByRole("button", { name: /查看專區/ });
    fireEvent.click(buttons[1]);
    expect(dispatch).toHaveBeenCalledWith({ type: "GO_TO_CHARACTER_QA", payload: "phantom" });
  });
});
