import { gql } from "@apollo/client";

const QUERY_ALLPOKEMONS = gql`
  query allPokemons {
    pokemons: pokemon_v2_pokemon {
      id
      name
    }
  }
`;