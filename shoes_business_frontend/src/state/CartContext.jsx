import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { cartReducer, initialCartState, selectItems, selectItemCount, selectSubtotal, selectSidebarOpen } from './cartReducer';
import { ADD_ITEM, REMOVE_ITEM, UPDATE_QTY, CLEAR_CART, SET_SIDEBAR_OPEN } from './types';

const STORAGE_KEY = 'oceanKicks.cart.v1';

const CartStateContext = createContext(undefined);
const CartDispatchContext = createContext(undefined);

/**
 * PUBLIC_INTERFACE
 * CartProvider - Provides global cart state and actions using Context + useReducer.
 * Persists to localStorage and hydrates on load.
 */
export function CartProvider({ children }) {
  // Hydrate from localStorage
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          // Make sure shape is valid
          if (parsed && Array.isArray(parsed.items)) {
            return { ...initialCartState, ...parsed, items: parsed.items.map((i) => ({ ...i, qty: Math.max(1, Number(i.qty || 1)) })) };
          }
        }
      } catch {
        // ignore storage errors
      }
      return initialCartState;
    }
  );

  // Persist to localStorage when items or sidebar changes
  useEffect(() => {
    try {
      const toSave = JSON.stringify({ items: state.items, sidebarOpen: state.sidebarOpen });
      localStorage.setItem(STORAGE_KEY, toSave);
    } catch {
      // ignore
    }
  }, [state.items, state.sidebarOpen]);

  const actions = useMemo(() => ({
    // PUBLIC_INTERFACE
    addItem: (item) => dispatch({ type: ADD_ITEM, payload: item }),
    // PUBLIC_INTERFACE
    removeItem: (item) => dispatch({ type: REMOVE_ITEM, payload: item }),
    // PUBLIC_INTERFACE
    updateQty: (item, qty) => dispatch({ type: UPDATE_QTY, payload: { item, qty } }),
    // PUBLIC_INTERFACE
    clearCart: () => dispatch({ type: CLEAR_CART }),
    // PUBLIC_INTERFACE
    setSidebarOpen: (open) => dispatch({ type: SET_SIDEBAR_OPEN, payload: open }),
  }), []);

  const selectors = useMemo(() => ({
    items: selectItems(state),
    itemCount: selectItemCount(state),
    subtotal: selectSubtotal(state),
    sidebarOpen: selectSidebarOpen(state),
  }), [state]);

  // Expose both state selectors and actions
  const value = useMemo(() => ({ ...selectors, ...actions }), [selectors, actions]);

  return (
    <CartStateContext.Provider value={value}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useCart - Access cart selectors and actions.
 */
export function useCart() {
  const ctx = useContext(CartStateContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
