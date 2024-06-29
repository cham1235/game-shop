import { Badge } from "@chakra-ui/layout";

interface Props {
  score: number;
}

const CirticScore = ({ score }: Props) => {
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "";
  return (
    <>
      <Badge colorScheme={color} fontSize="14px" borderRadius="4px">
        {score}
      </Badge>
    </>
  );
};

export default CirticScore;
