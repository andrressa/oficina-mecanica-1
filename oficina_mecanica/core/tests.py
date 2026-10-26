from rest_framework.test import APITestCase

class OficinaAPITests(APITestCase):
    def test_pagina_inicial(self):
        self.assertContains(self.client.get('/'), 'Oficina Mecânica')

    def test_fluxo_cliente_veiculo_ordem(self):
        c = self.client.post('/api/clientes/', {'nome':'Cliente Teste','cpf':'00000000000','telefone':'24999990000'})
        self.assertEqual(c.status_code, 201)
        repetido = self.client.post('/api/clientes/', {'nome':'Duplicado','cpf':'00000000000','telefone':'24999990000'})
        self.assertEqual(repetido.status_code, 400)
        v = self.client.post('/api/veiculos/', {'cliente':c.data['id'],'placa':'AAA0A00','marca':'Fiat','modelo':'Uno','ano':2020})
        self.assertEqual(v.status_code, 201)
        o = self.client.post('/api/ordens-servico/', {'veiculo':v.data['id'],'descricao':'Troca de óleo','valor':'150.00'})
        self.assertEqual(o.status_code, 201)
        url = f"/api/ordens-servico/{o.data['id']}/"
        atualizado = self.client.patch(url, {'status':'CONCLUIDA'})
        self.assertEqual(atualizado.data['status'], 'CONCLUIDA')
        self.assertEqual(self.client.get(url).data['valor'], '150.00')
        self.assertEqual(self.client.delete(url).status_code, 204)
        self.assertEqual(self.client.get(url).status_code, 404)

    def test_veiculo_sem_cliente_valido(self):
        r = self.client.post('/api/veiculos/', {'cliente':999,'placa':'BBB0B00','marca':'Fiat','modelo':'Uno','ano':2020})
        self.assertEqual(r.status_code, 400)
