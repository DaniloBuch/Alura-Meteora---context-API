export const ADD_PRODUTO = "ADD_PRODUTO";
export const REMOVE_PRODUTO = "REMOVE_PRODUTO";
export const UPDATE_QUANTIDADE = "UPDATE_QUANTIDADE";

export const carrinhoReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUTO:
      const novoProduto = action.payload;
      const produto = state.findIndex((item) => item.id === novoProduto.id);
      if (produto === -1) {
        novoProduto.quantidade = 1;
        return [...state, novoProduto];
      } else {
        return state.map((item, index) =>
          index === produto
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

    case REMOVE_PRODUTO:
      const produtoID = action.payload;
      return state.filter((item) => item.id !== produtoID);

    case UPDATE_QUANTIDADE:
      const { produtoID: id, quantidade } = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      );

    default:
      return state;
  }
};
