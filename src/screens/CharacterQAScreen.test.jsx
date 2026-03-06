import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterQAScreen } from "./CharacterQAScreen.jsx";

const STORAGE_KEY = "ctf-dating-sim-v1";

const baseState = {
  playerName: "alice",
  selectedCharacterId: "zero",
  googleUser: null,
};

const mockDispatch = vi.fn();

beforeEach(() => {
  localStorage.clear();
  mockDispatch.mockClear();
});

describe("CharacterQAScreen — character info", () => {
  it("renders the character's name", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    expect(screen.getByText(/Zero/i)).toBeInTheDocument();
  });

  it("renders the character's specialty", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    expect(screen.getByText(/Binary Exploitation/i)).toBeInTheDocument();
  });
});

describe("CharacterQAScreen — history display", () => {
  it("shows affection value when localStorage has prior result", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        alice: {
          zero: { affection: 75, confessionUnlocked: false, lastPlayed: "2026-01-01T00:00:00.000Z" },
        },
      })
    );
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    expect(screen.getByText(/75/)).toBeInTheDocument();
  });

  it("shows no-history placeholder when player has no prior result", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    expect(screen.getByText(/尚未挑戰過/)).toBeInTheDocument();
  });
});

describe("CharacterQAScreen — question preview", () => {
  it("shows the first demo question text for the selected character", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    expect(screen.getByText(/記憶體溢位攻擊/)).toBeInTheDocument();
  });

  it("shows the second demo question text", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    expect(screen.getByText(/暫存器負責儲存函式返回位址/)).toBeInTheDocument();
  });

  it("shows the third demo question text", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    expect(screen.getByText(/ret2libc/)).toBeInTheDocument();
  });

  it("does not show a fourth question text", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    // 4th zero question is about NX/DEP — should not appear
    expect(screen.queryByText(/NX \/ DEP 保護機制/)).not.toBeInTheDocument();
  });
});

describe("CharacterQAScreen — navigation buttons", () => {
  it("dispatches BACK_FROM_CHARACTER_QA when 返回 is clicked", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    fireEvent.click(screen.getByRole("button", { name: /返回/ }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "BACK_FROM_CHARACTER_QA" });
  });

  it("dispatches SELECT_CHARACTER with characterId when 開始挑戰 is clicked", () => {
    render(<CharacterQAScreen state={baseState} dispatch={mockDispatch} />);
    fireEvent.click(screen.getByRole("button", { name: /開始挑戰/ }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SELECT_CHARACTER", payload: "zero" });
  });
});
