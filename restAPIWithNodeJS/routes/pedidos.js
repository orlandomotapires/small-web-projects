const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

//Retorna todos os pedidos
router.get("/", (req, res, next) => {
	mysql.getConnection((error, conn) => {
		if (error) {return res.status(500).send({ error: error })}

		conn.query( `SELECT pedidos.idpedidos,
							pedidos.quantidade,
							produtos.idprodutos,
							produtos.nome,
							produtos.preco
						FROM pedidos
					INNER JOIN produtos
							ON produtos.idprodutos = pedidos.idprodutos;`,

			(error, result, fields) => {
			if (error) {return res.status(500).send({ error: error })}

			const response = {
				quantidadeTotalPedidos: result.length,
				produtos: result.map(pedido => {
					return {
						id_pedido: pedido.idpedidos,
						quantidade: pedido.quantidade,
						produto:{
							id_produto: pedido.idprodutos,
							nome: pedido.nome,
							preco: pedido.preco
						},		
						request: {
							tipo: "GET",
							descricao: "Retorna dados de um pedido específico",
							url:
								"http://localhost:3000/pedidos/" + pedido.idpedidos
								
						}
					}
				})
				
			};
			return res.status(200).send(response);
		});
	});
});


//Retorna os dados de um pedido
router.get("/:id_pedido", (req, res, next) => {
	mysql.getConnection((error, conn) => {

		if (error) {return res.status(500).send({ error: error })}

		conn.query(
			"SELECT * FROM pedidos WHERE idpedidos = ?;",
			[req.params.id_pedido],
			(error, result, fields) => {
				
				if (error) {return res.status(500).send({ error: error })}

				if(result.length == 0){
					return res.status(404).send({
						mensagem: 'Não foi encontrado um pedido com esse ID'
					})
				}

				const response = {
					pedido: {
						id_pedido: result[0].idpedidos,
						id_produto: result[0].idprodutos,
						quantidade: result[0].quantidade,
						request: {
							tipo: "GET",
							descricao: "Retorna dados de todos pedidos",
							url:
								"http://localhost:3000/pedidos"
								
						}
					}
				}

				return res.status(201).send(response);
			}
		);
	});
});


//Insere um pedido
router.post("/", (req, res, next) => {
	mysql.getConnection((error, conn) => {
		if (error) {return res.status(500).send({ error: error })}
		conn.query('SELECT * FROM produtos WHERE idprodutos = ?', 
		[req.body.id_produto], 
		(error, result, field) => {

			if (error) {return res.status(500).send({ error: error })}
			if(result.length == 0){
				return res.status(404).send({
					mensagem: 'Produto nao encontrado'
				})
			}	

			conn.query(	
				"INSERT INTO pedidos (idprodutos, quantidade) VALUES (?,?)",
				[req.body.id_produto, req.body.quantidade],
				(error, resultado, field) => {
					conn.release();
	
					if (error) {return res.status(500).send({ error: error })}

					const response = {	
						mensagem: "Pedido inserido com sucesso",
						pedidoCriado: {
							id_pedido: resultado.id_pedido,
							id_produto: req.body.id_produto,
							quantidade: req.body.quantidade,
							request: {
								tipo: "GET",
								descricao: "Retorna todos pedidos já criados",
								url:
									"http://localhost:3000/pedidos"
							}		
						}
					}
	
					return res.status(201).send(response);
				}
			);
		})
	});
});


//Exclui um pedidos
router.delete("/", (req, res, next) => {
	mysql.getConnection((error, conn) => {
		if (error) {
			return res.status(500).send({ error: error });
		}
		conn.query(
			`DELETE FROM pedidos 
				WHERE idpedidos =  ?`,

			[req.body.id_pedido],

			(error, result, field) => {
				conn.release();

				if (error) {return res.status(500).send({ error: error });}
				

				const response = {
					mensagem: "Pedido removido com sucesso",
					pedidoRemovido: {
						id_pedido: req.body.id_pedido,
						id_produto: result.idprodutos,
						quantidade: result.quantidade,
						request: {
							tipo: "POST",
							descricao: "Insere um produto",
							url: "http://localhost:3000/pedidos",
							body: {
								nome: 'String',
								preco: 'Number'
							}
						}		
					}

				}

				return res.status(201).send(response);
			}
		);
	});
});

module.exports = router;
