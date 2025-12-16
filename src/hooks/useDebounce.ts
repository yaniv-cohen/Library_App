import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value, delaying the update of the returned value 
 * until after the specified delay has passed without any further changes to the input value.
 * * @param value The value to debounce (e.g., a text input from a local state)
 * @param delay The delay in milliseconds (e.g., 400)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // CRITICAL CLEANUP FUNCTION:
    // If 'value' changes before the delay runs out, the previous timeout 
    // is cleared, and a new timer is set up. This ensures the update 
    // only happens once the user pauses typing.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
}