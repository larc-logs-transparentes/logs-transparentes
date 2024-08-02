import { initPyodide } from './pyodide.js';

export async function assinaturaParser(content) {
    const asn1 = await (await fetch('/assinatura.asn1')).text();

    const pyodide = await initPyodide();
    pyodide.FS.writeFile("assinatura.asn1", asn1);
    pyodide.FS.writeFile("assinatura.json", new Uint8Array(content));

    const pythonCode = `
    import json
    import asn1tools
    from pathlib import Path

    class DictWithBytesToJsonEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, (bytes, bytearray)):
                return obj.hex()
            return json.JSONEncoder.default(self, obj)

    def parse_assinatura():
        conv = asn1tools.compile_files("assinatura.asn1", codec="ber")

        envelope_decoded = conv.decode("EntidadeAssinaturaResultado", Path("assinatura.json").read_bytes())

        assinatura_sw = envelope_decoded["assinaturaSW"]
        assinatura_hw = envelope_decoded["assinaturaHW"]

        return json.dumps({
            "EntidadeResultadoRDV": envelope_decoded,
            "Assinatura SW": assinatura_sw,
            "Assinatura HW": assinatura_hw
        }, cls=DictWithBytesToJsonEncoder)

    parse_assinatura()
    `;
    const pythonExit = await pyodide.runPythonAsync(pythonCode);
    return JSON.parse(pythonExit);
}
