import BoletimCard from "components/BoletimCard";
import type { Candidate } from "pages/BuResults";

type Props = {
  result: {
    [key: string]: {
      identificacao_votavel: {
        codigo: number;
        partido: number;
      };
      quantidade_votos: number;
      tipo_voto: string;
    };
  };
};

export default function ResultCandidates({ result }: Props) {
  const candidates: Candidate[] = Object.keys(result)
    .filter((item) => item !== "branco" && item !== "nulo")
    .map((key) => ({
      ...result[key],
      voto: key,
    }));

  return (
    <div className="-mx-2 flex flex-wrap">
      {candidates.map((item) => (
        <div className="mb-6 w-1/2 px-2" key={item.voto}>
          <BoletimCard candidate={item} />
        </div>
      ))}
    </div>
  );
}
