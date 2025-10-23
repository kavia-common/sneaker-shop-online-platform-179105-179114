import { ADD_ITEM, REMOVE_ITEM, UPDATE_QTY, CLEAR_CART, SET_SIDEBAR_OPEN } from './types';

/**
 * Shape of cart state:
 * {
 *   items: Array<{ id, name, price, qty, size?, color? }>,
 *   sidebarOpen: boolean
 * }
 */

export const initialCartState = {
  items: [],
  sidebarOpen: false,
};

/**
 * Helper: find an existing item by identity (id + size + color).
 */
function matchItem(a, b) {
  return String(a.id) === String(b.id)
    && String(a.size ?? '') === String(b.size ?? '')
    && String(a.color ?? '') === String(b.color ?? '');
}

export function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const incoming = action.payload;
      // Normalize qty
      const qtyToAdd = Math.max(1, Number(incoming.qty || 1));

      const idx = state.items.findIndex((i) => matchItem(i, incoming));
      if (idx >= 0) {
        const items = state.items.slice();
        const existing = items[idx];
        items[idx] = { ...existing, qty: existing.qty + qtyToAdd };
        return { ...state, items, sidebarOpen: true };
      }
      return {
        ...state,
        items: [...state.items, { ...incoming, qty: qtyToAdd }],
        sidebarOpen: true,
      };
    }

    case REMOVE_ITEM: {
      const target = action.payload;
      const items = state.items.filter((i) => !matchItem(i, target));
      return { ...state, items };
    }

    case UPDATE_QTY: {
      const { item, qty } = action.payload;
      const nextQty = Math.max(1, Number(qty || 1));
      const items = state.items.map((i) => (matchItem(i, item) ? { ...i, qty: nextQty } : i));
      return { ...state, items };
    }

    case CLEAR_CART: {
      return { ...state, items: [] };
    }

    case SET_SIDEBAR_OPEN: {
      return { ...state, sidebarOpen: Boolean(action.payload) };
    }

    default:
      return state;
  }
}

/**
 * Selectors
 */
export const selectItems = (state) => state.items;
export const selectItemCount = (state) => state.items.reduce((sum, i) => sum + i.qty, 0);
export const selectSubtotal = (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
export const selectSidebarOpen = (state) => state.sidebarOpen;
