import { describe, it, expect } from "vitest";

// Test the reducer directly by extracting the logic via useReducer in a minimal way.
// Since the reducer is not exported, we test observable state via dispatch sequences
// using renderHook from @testing-library/react.
import { renderHook, act } from "@testing-library/react";
import { useGameState } from "./useGameState.js";

describe("useGameState — dashboard navigation", () => {
  it("starts on HOME screen", () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.screen).toBe("HOME");
  });

  it("GO_TO_DASHBOARD transitions to DASHBOARD screen", () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.dispatch({ type: "GO_TO_DASHBOARD" });
    });
    expect(result.current.state.screen).toBe("DASHBOARD");
  });

  it("BACK_TO_HOME_FROM_DASHBOARD returns to HOME from DASHBOARD", () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.dispatch({ type: "GO_TO_DASHBOARD" });
    });
    act(() => {
      result.current.dispatch({ type: "BACK_TO_HOME_FROM_DASHBOARD" });
    });
    expect(result.current.state.screen).toBe("HOME");
  });

  it("GO_TO_DASHBOARD preserves playerName and googleUser", () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.dispatch({ type: "SET_PLAYER_NAME", payload: "alice" });
      result.current.dispatch({ type: "SET_GOOGLE_USER", payload: { name: "alice", email: "a@b.com", picture: "" } });
    });
    act(() => {
      result.current.dispatch({ type: "GO_TO_DASHBOARD" });
    });
    expect(result.current.state.playerName).toBe("alice");
    expect(result.current.state.googleUser.name).toBe("alice");
  });
});
