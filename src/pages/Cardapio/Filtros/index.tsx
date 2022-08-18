import React, { useEffect } from "react";
import filtros from "./filtros.json";
import styles from './Filtros.module.scss';
import classNames from 'classnames';

type IOpcao = typeof filtros[0];

interface Props {
  filtro: number | null,
  setFiltro: React.Dispatch<React.SetStateAction<number | null>>,
  busca: string;
}

export default function Filtros({ filtro, setFiltro, busca }: Props) {
  let texto;
  useEffect(() => {
    texto = busca.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");


    for (let i = 0; i < filtros.length; i++) {
      
      if (texto == filtros[i].label.toLocaleLowerCase()) {
        selecionarFiltro(filtros[i]);
      } 
    }

  }, [busca])

  function selecionarFiltro(opcao: IOpcao) {

    if (filtro === opcao.id) {
      return setFiltro(null);
    }
    return setFiltro(opcao.id);
  }
  return (
    <div className={styles.filtros}>
      {filtros.map(opcao => (
        <button className={classNames({
          [styles.filtros__filtro]: true,
          [styles['filtros__filtro--ativo']]: filtro === opcao.id
        })} key={opcao.id} onClick={() => selecionarFiltro(opcao)}>
          {opcao.label}
        </button>
      ))}
    </div>
  )
}

