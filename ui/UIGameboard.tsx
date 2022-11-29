import { SimpleGrid, Flex, Heading } from '@chakra-ui/react'
import { Gameboard } from "../game/Gameboard";
import { UITile } from './UITile';


export function UIGameboard({board}: {board: Gameboard})
{
  return (
    <SimpleGrid columns={10} spacing={1}>
      {
        board.board.map((row, rowIndex) =>
        {
          return row.map((_, colIndex) =>
          {
            return <UITile
            tile={board.board[rowIndex][colIndex]}
            key = { rowIndex + " " + colIndex }></UITile>
          })
        })
      }
    </SimpleGrid>
  );
}
