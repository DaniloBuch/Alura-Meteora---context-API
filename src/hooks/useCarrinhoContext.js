import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";
import {
  ADD_PRODUTO,
  REMOVE_PRODUTO,
  UPDATE_QUANTIDADE,
} from "@/reducers/carrinhoRecucer";

const addProdutoAction = (novoProduto) => ({
  type: ADD_PRODUTO,
  payload: novoProduto,
});

const removeProdutoAction = (produtoID) => ({
  type: REMOVE_PRODUTO,
  payload: produtoID,
});

const updateQuantidadeAction = (produtoID, quantidade) => ({
  type: UPDATE_QUANTIDADE,
  payload: { produtoID, quantidade },
});

export const useCarrinhoContext = () => {
  const { carrinho, dispatch, quantidade, valorTotal } =
    useContext(CarrinhoContext);

  const adicionarProduto = (novoProduto) => {
    dispatch(addProdutoAction(novoProduto));
  };

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);

    if (produto && produto.quantidade > 1) {
      dispatch(updateQuantidadeAction(id, produto.quantidade - 1));
    } else {
      dispatch(removeProdutoAction(id));
    }
  }

  function removerProdutoCarrinho(id) {
    dispatch(removeProdutoAction(id));
  }

  return {
    carrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    quantidade,
    valorTotal,
  };
};
