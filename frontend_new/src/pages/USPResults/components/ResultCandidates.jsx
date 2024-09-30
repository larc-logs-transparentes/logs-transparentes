import BoletimCard from "./BoletimCard";
export default function ResultCandidates({ result }) {
    const candidates = Object.keys(result)
        .filter((item) => item !== "branco" && item !== "nulo")
        .map((key) => ({
        ...result[key],
        voto: key,
    }));
    return (<div className="-mx-2 flex flex-wrap">
      {candidates.map((item) => (<div className="mb-6 w-1/2 px-2" key={item.voto}>
          <BoletimCard candidate={item}/>
        </div>))}
    </div>);
}
