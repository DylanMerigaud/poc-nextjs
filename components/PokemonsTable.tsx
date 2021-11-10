import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import Image from "next/image";
import { Pokemon_V2_Pokemon } from "generated/pokemons_graphql";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80, hide: true },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "img",
    headerName: "Image",
    flex: 1,
    renderCell: (pokemon) => (
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt="picture of pokemon"
        width={50}
        height={50}
      />
    ),
    filterable: false,
    sortable: false,
  },
];

const PokemonTable: React.FunctionComponent<{
  pokemons: Array<Partial<Pokemon_V2_Pokemon>>;
}> = ({ pokemons }) => {
  const rows: GridRowsProp = useMemo(
    () =>
      pokemons.map((pokemon) => ({
        ...pokemon,
        name: pokemon.name?.replace(/(^|[\s-])\S/g, (match) => {
          return match.toUpperCase();
        }),
      })),
    [pokemons]
  );

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        rowHeight={50}
      />
    </div>
  );
};

export default PokemonTable;
