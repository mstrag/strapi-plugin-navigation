import styled from "styled-components";
import { Card } from "@buffetjs/styles";
import { colors } from "strapi-helper-plugin";

import CardItemRestore from "./CardItemRestore";

export const CartItemWidth = "25vw";

const CardItem = styled(Card)`
  max-width: ${CartItemWidth};
  margin-bottom: ${(props) => (props.hasChildren ? 0 : "2rem")};
  padding: 1rem;

  border-bottom: tranparent;

  position: relative;

  transition: all 0.15s ease-in-out;

  ${ props => !props.removed && `
    &:hover {
      background-color: ${colors.lightGrey};

      padding-left: 1.5rem;

      cursor: pointer;
    }
  `}

  ${ props => props.removed && `
    background-color: ${colors.lightGrey};

    p, small, span {
      filter: blur(.25rem);
      -webkit-filter: blur(.25rem);
    }
  `}

  p {
    margin-bottom: 0;
  }
`;

export default CardItem;
