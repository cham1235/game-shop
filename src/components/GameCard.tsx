import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import CirticScore from "./CirticScore";
import getCroppedImageUrl from "../service/image-url";
interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <>
      <Card width="250px" borderRadius={10} overflow="hidden">
        <Image src={getCroppedImageUrl(game.background_image)} />
        <CardBody>
          <Heading fontSize="2xl">{game.name}</Heading>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          ></PlatformIconList>
          <CirticScore score={game.metacritic} />
        </CardBody>
      </Card>
    </>
  );
};

export default GameCard;
