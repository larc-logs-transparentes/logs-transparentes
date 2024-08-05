import { initPyodide } from './pyodide.js';

export async function buParser(content) {
    const ans1 = await (await fetch('/bu.asn1')).text();

    const pyodide = await initPyodide();
    pyodide.FS.writeFile("bu.asn1", ans1);
    pyodide.FS.writeFile("bu.json", new Uint8Array(content));

    const pythonCode = `
    import json
    import asn1tools
    from pathlib import Path
    
    class DictWithBytesToJsonEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, (bytes, bytearray)):
                return obj.hex()
            # Let the base class default method raise the TypeError
            return json.JSONEncoder.default(self, obj)
        
    def parse_bu():
        conv = asn1tools.compile_files("bu.asn1")

        envelope_decoded = conv.decode("EntidadeEnvelopeGenerico", Path("bu.json").read_bytes())

        bu_encoded = envelope_decoded['conteudo']
        bu_decoded = conv.decode('EntidadeBoletimUrna', bu_encoded)

        return json.dumps(bu_decoded, cls=DictWithBytesToJsonEncoder)

    parse_bu()
    `;
    const pythonExit = await pyodide.runPythonAsync(pythonCode);
    return JSON.parse(pythonExit);
}
