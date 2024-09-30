import Select from "./Select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BoletimClassesCard from "./BoletimClassesCard";
import useRequest from "../../../hooks/useRequest";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Transition } from "@headlessui/react";
import api from "../../../lib/api";
import ResultCandidates from "./ResultCandidates";

const SweetAlert = withReactContent(Swal);
const formSchema = z.object({
    election: z.union([z.number(), z.string()]),
    state: z.string(),
    city: z.union([z.number(), z.string()]).optional(),
    role: z.string(),
    file: z.any(),
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
    // .refine(
    //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // )
});
const cargos = {
    presidente: "Presidente da República",
    governador: "Governador",
    senador: "Senador",
    deputadoFederal: "Deputador Federal",
    deputadoEstadual: "Deputador Estadual",
    prefeito: "Prefeito",
};
export default function BuResults() {
    const [soma, setSoma] = useState(null);
    const [response, setResponse] = useState(null);
    const { control, watch, handleSubmit, setValue } = useForm({
        resolver: zodResolver(formSchema),
    });
    const election = watch("election");
    const state = watch("state");
    useEffect(() => {
        setValue("city", undefined);
    }, [state, setValue]);
    const { data: elections = [] } = useRequest("/sum-result/distinct_eleicoes");
    const { data: ufs } = useRequest(`/sum-result/distinct_uf?id_eleicao=${election}`);
    const { data: dCargos } = useRequest(`/sum-result/distinct_cargos?id_eleicao=${election}&estado=${state}`);
    const { data: dMunicipios } = useRequest(`/sum-result/distinct_municipio?id_eleicao=${election}&estado=${state}`);
    const electionsOptions = elections.map((election) => ({
        label: election,
        value: election,
    }));
    const ufsOptions = ufs
        ? ufs.map((uf) => ({
            label: uf,
            value: uf,
        }))
        : [];
    const cargo = dCargos
        ? dCargos.map((item) => ({
            label: cargos[item],
            value: item,
        }))
        : [];
    const municipios = dMunicipios
        ? dMunicipios
            .filter((item) => item._id.municipio)
            .map((item) => ({
            label: item._id.municipio,
            value: item._id.municipio_code,
        }))
        : [];
    const onSubmit = async (data) => {
        const queryParams = new URLSearchParams({
            ...(data.state && { estado: data.state }),
            ...(data.election && { id_eleicao: data.election }),
            ...(data.role && { cargo: data.role }),
            ...(data.city && { municipio: data.city }),
        }).toString();
        const response = await api.get(`sum-result/find_by_info?${queryParams}`);
        if (response.data) {
            setSoma(JSON.parse(response.data.result));
            setResponse(response.data);
        }
    };
    const onError = () => {
        SweetAlert.fire({
            icon: "error",
            title: "Campos obrigatórios",
            text: "Os campos de Eleição, Estado e Cargo são obrigatórios",
        });
    };
    return (<div>
      <Transition show={false} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150 delay-500" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-md bg-white p-5 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-slate-800">
              Verificando BUs
            </h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="mb-8 h-12 w-12 animate-spin fill-default-cyan-400" viewBox="0 0 512 512">
              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>
            </svg>
          </div>
        </div>
      </Transition>
      <div className="bg-blue py-8">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-8 text-center text-2xl font-medium font-inter text-white">
            Conferir resultado usando BUs verificados pela USP
          </h1>
          <form>
            <div className="-mx-5 flex items-end justify-center">
              <div className="px-5">
                <Controller control={control} name="election" render={({ field: { value, onChange, name } }) => (<Select onChange={onChange} name={name} value={value} label="Eleição*" options={electionsOptions} placeholder="Escolher Eleição"/>)}/>
              </div>
              <div className="px-5">
                <Controller control={control} name="state" render={({ field: { value, onChange, name } }) => (<Select onChange={onChange} name={name} value={value} label="Estado*" options={ufsOptions} placeholder="Escolher Estado"/>)}/>
              </div>
              <div className="px-5">
                <Controller control={control} name="city" render={({ field: { value, onChange, name } }) => (<Select onChange={onChange} name={name} value={value} label="Cidade" options={municipios} placeholder="Escolher Cidade" required={false}/>)}/>
              </div>
              <div className="px-5">
                <Controller control={control} name="role" render={({ field: { value, onChange, name } }) => (<Select onChange={onChange} name={name} value={value} label="Cargo*" options={cargo} placeholder="Escolher Cargo"/>)}/>
              </div>
              <div className="px-5">
                <button onClick={handleSubmit(onSubmit, onError)} type="button" className="rounded-full bg-yellow px-4 py-2 font-medium tracking-wide text-black">
                  Calcular
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <section className="mx-auto max-w-7xl p-6">
        <div className="rounded-2xl border-2 border-blue-light p-6">
          <h2 className="mb-6 text-2xl font-medium text-blue-light">
            Resultados
          </h2>

          <div className="">
            {response && (<ResultCandidates result={JSON.parse(response.result)}/>)}
          </div>
          <div>{soma && <BoletimClassesCard soma={soma}/>}</div>
        </div>
      </section>
    </div>);
}
