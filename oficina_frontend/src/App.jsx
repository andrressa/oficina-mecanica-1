import { useEffect, useMemo, useState } from 'react'

// Usa o proxy configurado no Vite: /api -> http://127.0.0.1:8000/api
const API = '/api'

const emptyForms = {
  clientes: { nome: '', cpf: '', telefone: '', email: '' },
  veiculos: { cliente: '', placa: '', marca: '', modelo: '', ano: '' },
  funcionarios: { nome: '', cargo: '', telefone: '' },
  ordens: {
    veiculo: '',
    funcionario: '',
    descricao: '',
    status: 'ABERTA',
    valor: '0.00',
  },
}

function CabecalhoTabela({ children }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  )
}

function Acoes({ secao, item, onEditar, onExcluir }) {
  return (
    <td className="acoes">
      <button
        className="btn secundario"
        type="button"
        onClick={() => onEditar(secao, item)}
      >
        Editar
      </button>

      <button
        className="btn perigo"
        type="button"
        onClick={() => onExcluir(secao, item.id)}
      >
        Excluir
      </button>
    </td>
  )
}

function Clientes({
  form,
  clientes,
  editando,
  atualizarCampo,
  salvar,
  limparFormulario,
  editar,
  excluir,
}) {
  return (
    <>
      <section className="card">
        <h2>
          {editando?.secao === 'clientes'
            ? 'Editar cliente'
            : 'Cadastrar cliente'}
        </h2>

        <form onSubmit={(e) => salvar('clientes', e)} className="grid-form">
          <label>
            Nome
            <input
              required
              value={form.nome}
              onChange={(e) =>
                atualizarCampo('clientes', 'nome', e.target.value)
              }
            />
          </label>

          <label>
            CPF
            <input
              required
              value={form.cpf}
              onChange={(e) =>
                atualizarCampo('clientes', 'cpf', e.target.value)
              }
              placeholder="000.000.000-00"
            />
          </label>

          <label>
            Telefone
            <input
              required
              value={form.telefone}
              onChange={(e) =>
                atualizarCampo('clientes', 'telefone', e.target.value)
              }
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                atualizarCampo('clientes', 'email', e.target.value)
              }
            />
          </label>

          <div className="form-actions">
            <button className="btn primario" type="submit">
              {editando?.secao === 'clientes'
                ? 'Salvar alterações'
                : 'Cadastrar'}
            </button>

            {editando?.secao === 'clientes' && (
              <button
                className="btn secundario"
                type="button"
                onClick={() => limparFormulario('clientes')}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Clientes</h2>

        <div className="table-wrap">
          <table>
            <CabecalhoTabela>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Ações</th>
            </CabecalhoTabela>

            <tbody>
              {clientes.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nome}</td>
                  <td>{c.cpf}</td>
                  <td>{c.telefone}</td>
                  <td>{c.email || '-'}</td>
                  <Acoes
                    secao="clientes"
                    item={c}
                    onEditar={editar}
                    onExcluir={excluir}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function Veiculos({
  form,
  clientes,
  veiculos,
  clientePorId,
  editando,
  atualizarCampo,
  salvar,
  limparFormulario,
  editar,
  excluir,
}) {
  return (
    <>
      <section className="card">
        <h2>
          {editando?.secao === 'veiculos'
            ? 'Editar veículo'
            : 'Cadastrar veículo'}
        </h2>

        <form onSubmit={(e) => salvar('veiculos', e)} className="grid-form">
          <label>
            Cliente
            <select
              required
              value={form.cliente}
              onChange={(e) =>
                atualizarCampo('veiculos', 'cliente', e.target.value)
              }
            >
              <option value="">Selecione</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </label>

          <label>
            Placa
            <input
              required
              value={form.placa}
              onChange={(e) =>
                atualizarCampo(
                  'veiculos',
                  'placa',
                  e.target.value.toUpperCase()
                )
              }
            />
          </label>

          <label>
            Marca
            <input
              required
              value={form.marca}
              onChange={(e) =>
                atualizarCampo('veiculos', 'marca', e.target.value)
              }
            />
          </label>

          <label>
            Modelo
            <input
              required
              value={form.modelo}
              onChange={(e) =>
                atualizarCampo('veiculos', 'modelo', e.target.value)
              }
            />
          </label>

          <label>
            Ano
            <input
              required
              type="number"
              min="1900"
              max="2100"
              value={form.ano}
              onChange={(e) =>
                atualizarCampo('veiculos', 'ano', e.target.value)
              }
            />
          </label>

          <div className="form-actions">
            <button className="btn primario" type="submit">
              {editando?.secao === 'veiculos'
                ? 'Salvar alterações'
                : 'Cadastrar'}
            </button>

            {editando?.secao === 'veiculos' && (
              <button
                className="btn secundario"
                type="button"
                onClick={() => limparFormulario('veiculos')}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Veículos</h2>

        <div className="table-wrap">
          <table>
            <CabecalhoTabela>
              <th>ID</th>
              <th>Cliente</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Ações</th>
            </CabecalhoTabela>

            <tbody>
              {veiculos.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{clientePorId[v.cliente]?.nome || `#${v.cliente}`}</td>
                  <td>{v.placa}</td>
                  <td>{v.marca}</td>
                  <td>{v.modelo}</td>
                  <td>{v.ano}</td>
                  <Acoes
                    secao="veiculos"
                    item={v}
                    onEditar={editar}
                    onExcluir={excluir}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function Funcionarios({
  form,
  funcionarios,
  editando,
  atualizarCampo,
  salvar,
  limparFormulario,
  editar,
  excluir,
}) {
  return (
    <>
      <section className="card">
        <h2>
          {editando?.secao === 'funcionarios'
            ? 'Editar funcionário'
            : 'Cadastrar funcionário'}
        </h2>

        <form
          onSubmit={(e) => salvar('funcionarios', e)}
          className="grid-form"
        >
          <label>
            Nome
            <input
              required
              value={form.nome}
              onChange={(e) =>
                atualizarCampo('funcionarios', 'nome', e.target.value)
              }
            />
          </label>

          <label>
            Cargo
            <input
              required
              value={form.cargo}
              onChange={(e) =>
                atualizarCampo('funcionarios', 'cargo', e.target.value)
              }
            />
          </label>

          <label>
            Telefone
            <input
              required
              value={form.telefone}
              onChange={(e) =>
                atualizarCampo('funcionarios', 'telefone', e.target.value)
              }
            />
          </label>

          <div className="form-actions">
            <button className="btn primario" type="submit">
              {editando?.secao === 'funcionarios'
                ? 'Salvar alterações'
                : 'Cadastrar'}
            </button>

            {editando?.secao === 'funcionarios' && (
              <button
                className="btn secundario"
                type="button"
                onClick={() => limparFormulario('funcionarios')}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Funcionários</h2>

        <div className="table-wrap">
          <table>
            <CabecalhoTabela>
              <th>ID</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Telefone</th>
              <th>Ações</th>
            </CabecalhoTabela>

            <tbody>
              {funcionarios.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.nome}</td>
                  <td>{f.cargo}</td>
                  <td>{f.telefone}</td>
                  <Acoes
                    secao="funcionarios"
                    item={f}
                    onEditar={editar}
                    onExcluir={excluir}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function Ordens({
  form,
  ordens,
  veiculos,
  funcionarios,
  clientePorId,
  veiculoPorId,
  funcionarioPorId,
  editando,
  atualizarCampo,
  salvar,
  limparFormulario,
  editar,
  excluir,
}) {
  return (
    <>
      <section className="card destaque">
        <h2>
          {editando?.secao === 'ordens'
            ? 'Editar ordem de serviço'
            : 'Nova ordem de serviço'}
        </h2>

        <form onSubmit={(e) => salvar('ordens', e)} className="grid-form">
          <label>
            Veículo
            <select
              required
              value={form.veiculo}
              onChange={(e) =>
                atualizarCampo('ordens', 'veiculo', e.target.value)
              }
            >
              <option value="">Selecione</option>
              {veiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.placa} — {v.marca} {v.modelo}
                </option>
              ))}
            </select>
          </label>

          <label>
            Funcionário
            <select
              value={form.funcionario}
              onChange={(e) =>
                atualizarCampo('ordens', 'funcionario', e.target.value)
              }
            >
              <option value="">Sem responsável</option>
              {funcionarios.map((func) => (
                <option key={func.id} value={func.id}>
                  {func.nome} — {func.cargo}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select
              value={form.status}
              onChange={(e) =>
                atualizarCampo('ordens', 'status', e.target.value)
              }
            >
              <option value="ABERTA">Aberta</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDA">Concluída</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </label>

          <label>
            Valor (R$)
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.valor}
              onChange={(e) =>
                atualizarCampo('ordens', 'valor', e.target.value)
              }
            />
          </label>

          <label className="full">
            Descrição
            <textarea
              required
              rows="4"
              value={form.descricao}
              onChange={(e) =>
                atualizarCampo('ordens', 'descricao', e.target.value)
              }
            />
          </label>

          <div className="form-actions">
            <button className="btn primario" type="submit">
              {editando?.secao === 'ordens'
                ? 'Salvar alterações'
                : 'Abrir ordem'}
            </button>

            {editando?.secao === 'ordens' && (
              <button
                className="btn secundario"
                type="button"
                onClick={() => limparFormulario('ordens')}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Ordens de serviço</h2>

        <div className="table-wrap">
          <table>
            <CabecalhoTabela>
              <th>ID</th>
              <th>Veículo</th>
              <th>Cliente</th>
              <th>Funcionário</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Abertura</th>
              <th>Descrição</th>
              <th>Ações</th>
            </CabecalhoTabela>

            <tbody>
              {ordens.map((o) => {
                const v = veiculoPorId[o.veiculo]
                const c = v ? clientePorId[v.cliente] : null

                return (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>
                      {v ? `${v.placa} — ${v.modelo}` : `#${o.veiculo}`}
                    </td>
                    <td>{c?.nome || '-'}</td>
                    <td>
                      {o.funcionario
                        ? funcionarioPorId[o.funcionario]?.nome ||
                          `#${o.funcionario}`
                        : '-'}
                    </td>
                    <td>
                      <span
                        className={`status ${String(o.status).toLowerCase()}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>
                      R$ {Number(o.valor || 0).toFixed(2).replace('.', ',')}
                    </td>
                    <td>
                      {o.data_abertura
                        ? new Date(o.data_abertura).toLocaleString('pt-BR')
                        : '-'}
                    </td>
                    <td>{o.descricao}</td>
                    <Acoes
                      secao="ordens"
                      item={o}
                      onEditar={editar}
                      onExcluir={excluir}
                    />
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function App() {
  const [aba, setAba] = useState('clientes')
  const [clientes, setClientes] = useState([])
  const [veiculos, setVeiculos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])
  const [ordens, setOrdens] = useState([])
  const [forms, setForms] = useState(emptyForms)
  const [editando, setEditando] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const endpoints = {
    clientes: 'clientes',
    veiculos: 'veiculos',
    funcionarios: 'funcionarios',
    ordens: 'ordens-servico',
  }

  async function apiFetch(path, options = {}) {
    const response = await fetch(`${API}/${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    })

    if (!response.ok) {
      let detail = ''

      try {
        detail = JSON.stringify(await response.json())
      } catch {
        detail = await response.text()
      }

      throw new Error(detail || `Erro HTTP ${response.status}`)
    }

    if (response.status === 204) return null

    return response.json()
  }

  async function carregarTudo() {
    setCarregando(true)
    setErro('')

    try {
      const [c, v, f, o] = await Promise.all([
        apiFetch('clientes/'),
        apiFetch('veiculos/'),
        apiFetch('funcionarios/'),
        apiFetch('ordens-servico/'),
      ])

      setClientes(c)
      setVeiculos(v)
      setFuncionarios(f)
      setOrdens(o)
    } catch (e) {
      setErro(`Não foi possível acessar a API Django. ${e.message}`)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarTudo()
  }, [])

  const clientePorId = useMemo(
    () => Object.fromEntries(clientes.map((c) => [c.id, c])),
    [clientes]
  )

  const veiculoPorId = useMemo(
    () => Object.fromEntries(veiculos.map((v) => [v.id, v])),
    [veiculos]
  )

  const funcionarioPorId = useMemo(
    () => Object.fromEntries(funcionarios.map((f) => [f.id, f])),
    [funcionarios]
  )

  function atualizarCampo(secao, campo, valor) {
    setForms((prev) => ({
      ...prev,
      [secao]: {
        ...prev[secao],
        [campo]: valor,
      },
    }))
  }

  function limparFormulario(secao) {
    setForms((prev) => ({
      ...prev,
      [secao]: { ...emptyForms[secao] },
    }))

    setEditando(null)
  }

  function normalizarPayload(secao, form) {
    const payload = { ...form }

    if (secao === 'veiculos') {
      payload.cliente = Number(payload.cliente)
      payload.ano = Number(payload.ano)
    }

    if (secao === 'ordens') {
      payload.veiculo = Number(payload.veiculo)
      payload.funcionario = payload.funcionario
        ? Number(payload.funcionario)
        : null
      payload.valor = payload.valor === '' ? '0.00' : payload.valor
    }

    return payload
  }

  async function salvar(secao, e) {
    e.preventDefault()
    setErro('')
    setMensagem('')

    try {
      const endpoint = endpoints[secao]
      const payload = normalizarPayload(secao, forms[secao])
      const estaEditando = editando?.secao === secao

      const path = estaEditando
        ? `${endpoint}/${editando.id}/`
        : `${endpoint}/`

      await apiFetch(path, {
        method: estaEditando ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      })

      setMensagem(
        estaEditando
          ? 'Registro atualizado com sucesso.'
          : 'Registro cadastrado com sucesso.'
      )

      limparFormulario(secao)
      await carregarTudo()
    } catch (e) {
      setErro(`Erro ao salvar: ${e.message}`)
    }
  }

  function editar(secao, item) {
    const form = { ...item }

    delete form.id
    delete form.data_abertura

    if (secao === 'ordens' && form.funcionario == null) {
      form.funcionario = ''
    }

    setForms((prev) => ({
      ...prev,
      [secao]: form,
    }))

    setEditando({ secao, id: item.id })
    setAba(secao)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function excluir(secao, id) {
    if (!window.confirm('Deseja realmente excluir este registro?')) return

    setErro('')
    setMensagem('')

    try {
      await apiFetch(`${endpoints[secao]}/${id}/`, {
        method: 'DELETE',
      })

      setMensagem('Registro excluído com sucesso.')
      await carregarTudo()
    } catch (e) {
      setErro(`Erro ao excluir: ${e.message}`)
    }
  }

  return (
    <div className="app-shell">
      <header className="topo">
        <div>
          <p className="eyebrow">Sistema de gestão</p>
          <h1>Oficina Mecânica</h1>
          <p className="subtitulo">
            Front-end React conectado à API Django REST Framework
          </p>
        </div>

        <div className="api-pill">API: {API}</div>
      </header>

      <nav className="tabs">
        <button
          className={aba === 'clientes' ? 'ativo' : ''}
          onClick={() => setAba('clientes')}
        >
          Clientes
        </button>

        <button
          className={aba === 'veiculos' ? 'ativo' : ''}
          onClick={() => setAba('veiculos')}
        >
          Veículos
        </button>

        <button
          className={aba === 'funcionarios' ? 'ativo' : ''}
          onClick={() => setAba('funcionarios')}
        >
          Funcionários
        </button>

        <button
          className={aba === 'ordens' ? 'ativo' : ''}
          onClick={() => setAba('ordens')}
        >
          Ordens de serviço
        </button>
      </nav>

      <main>
        {carregando && <div className="notice">Carregando dados...</div>}
        {mensagem && <div className="notice sucesso">{mensagem}</div>}
        {erro && <div className="notice erro">{erro}</div>}

        {aba === 'clientes' && (
          <Clientes
            form={forms.clientes}
            clientes={clientes}
            editando={editando}
            atualizarCampo={atualizarCampo}
            salvar={salvar}
            limparFormulario={limparFormulario}
            editar={editar}
            excluir={excluir}
          />
        )}

        {aba === 'veiculos' && (
          <Veiculos
            form={forms.veiculos}
            clientes={clientes}
            veiculos={veiculos}
            clientePorId={clientePorId}
            editando={editando}
            atualizarCampo={atualizarCampo}
            salvar={salvar}
            limparFormulario={limparFormulario}
            editar={editar}
            excluir={excluir}
          />
        )}

        {aba === 'funcionarios' && (
          <Funcionarios
            form={forms.funcionarios}
            funcionarios={funcionarios}
            editando={editando}
            atualizarCampo={atualizarCampo}
            salvar={salvar}
            limparFormulario={limparFormulario}
            editar={editar}
            excluir={excluir}
          />
        )}

        {aba === 'ordens' && (
          <Ordens
            form={forms.ordens}
            ordens={ordens}
            veiculos={veiculos}
            funcionarios={funcionarios}
            clientePorId={clientePorId}
            veiculoPorId={veiculoPorId}
            funcionarioPorId={funcionarioPorId}
            editando={editando}
            atualizarCampo={atualizarCampo}
            salvar={salvar}
            limparFormulario={limparFormulario}
            editar={editar}
            excluir={excluir}
          />
        )}
      </main>
    </div>
  )
}

export default App
