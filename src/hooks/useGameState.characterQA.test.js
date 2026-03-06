import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useGameState } from "./useGameState.js";

describe("useGameState — CHARACTER_QA navigation", () => {
  it("GO_TO_CHARACTER_QA transitions to CHARACTER_QA screen", () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.dispatch({ type: "GO_TO_CHARACTER_SELECT" });
    });
    act(() => {
      result.current.dispatch({ type: "GO_TO_CHARACTER_QA", payload: "zero" });
    });
    expect(result.current.state.screen).toBe("CHARACTER_QA");
  });

  it("GO_TO_CHARACTER_QA sets selectedCharacterId from payload", () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.dispatch({ type: "GO_TO_CHARACTER_QA", payload: "phantom" });
    });
    expect(result.current.state.selectedCharacterId).toBe("phantom");
  });

  it("BACK_FROM_CHARACTER_QA returns to CHARACTER_SELECT", () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.dispatch({ type: "GO_TO_CHARACTER_QA", payload: "zero" });
    });
    act(() => {
      result.current.dispatch({ type: "BACK_FROM_CHARACTER_QA" });
    });
    expect(result.current.state.screen).toBe("CHARACTER_SELECT");
  });

  it("BACK_FROM_CHARACTER_QA resets selectedCharacterId to null", () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.dispatch({ type: "GO_TO_CHARACTER_QA", payload: "cipher" });
    });
    act(() => {
      result.current.dispatch({ type: "BACK_FROM_CHARACTER_QA" });
    });
    expect(result.current.state.selectedCharacterId).toBeNull();
  });

  it("GO_TO_CHARACTER_QA preserves playerName and googleUser", () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.dispatch({ type: "SET_PLAYER_NAME", payload: "alice" });
      result.current.dispatch({ type: "SET_GOOGLE_USER", payload: { name: "alice", email: "a@b.com", picture: "" } });
    });
    act(() => {
      result.current.dispatch({ type: "GO_TO_CHARACTER_QA", payload: "zero" });
    });
    expect(result.current.state.playerName).toBe("alice");
    expect(result.current.state.googleUser.name).toBe("alice");
  });

  it("GO_TO_CHARACTER_QA works from HOME screen (edge case)", () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.screen).toBe("HOME");
    act(() => {
      result.current.dispatch({ type: "GO_TO_CHARACTER_QA", payload: "glitch" });
    });
    expect(result.current.state.screen).toBe("CHARACTER_QA");
    expect(result.current.state.selectedCharacterId).toBe("glitch");
  });

  it("BACK_FROM_CHARACTER_QA from non-CHARACTER_QA screen does not change screen", () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.screen).toBe("HOME");
    act(() => {
      result.current.dispatch({ type: "BACK_FROM_CHARACTER_QA" });
    });
    expect(result.current.state.screen).toBe("HOME");
  });
});
