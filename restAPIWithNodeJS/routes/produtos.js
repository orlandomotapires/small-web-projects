const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb){
		cb(null, './uploads/');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString + file.originalname);
	}
})

const fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null, true);
	}else{
		cb(null, false);
	}
}
	
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},

	fileFilter: fileFilter
});

//Retorna todos os produtos
router.get("/", (req, res, next) => {
	mysql.getConnection((error, conn) => {
		if (error) {return res.status(500).send({ error: error })}

		conn.query("SELECT * FROM produtos;", 
		(error, result, fields) => {
			if (error) {return res.status(500).send({ error: error })}

			const response = {
				todosProdutos:{
					quantidade: result.length,
					produtos: result.map(prod => {
						return {
							id_produto: prod.idprodutos,
							nome: prod.nome,
							preco: prod.preco,
							imagem_produto: prod.imagem_produto,
							request: {
								tipo: "GET",
								descricao: "Retorna dados de um produto específico",
								url:
									"http://localhost:3000/produtos/" + prod.idprodutos
									
							}
						}
					})
				}
			};
			return res.status(200).send(response);
		});
	});
});

//Retorna os dados de um produto
router.get("/:id_produto", (req, res, next) => {
	mysql.getConnection((error, conn) => {

		if (error) {return res.status(500).send({ error: error })}

		conn.query(
			"SELECT * FROM produtos WHERE idprodutos = ?;",
			[req.params.id_produto],
			(error, result, fields) => {
				if (error) {return res.status(500).send({ error: error })}

				if(result.length == 0){
					return res.status(404).send({
						mensagem: 'Não foi encontrado produto com esse ID'
					})
				}

				const response = {
					produtoPesquisado: {
						produto: result.insertId,
						nome: req.body.nome,
						preco: req.body.preco,
						imagem_produto: result[0].imagem_produto,
						request: {
							tipo: "GET",
							descricao: "Retorna dados de todos produtos",
							url:
								"http://localhost:3000/produtos"
								
						}
					}
				}

				return res.status(201).send(response);
			}
		);
	});
});

//Insere um produto
router.post("/", upload.single('produto_imagem'), (req, res, next) => {
	console.log(req.file);
	mysql.getConnection((error, conn) => {
		if (error) {return res.status(500).send({ error: error })}
		conn.query(
			"INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)",
			[req.body.nome, req.body.preco, req.file.path],
			(error, resultado, field) => {
				conn.release();

				if (error) {return res.status(500).send({ error: error })}
				
				const response = {
					mensagem: "Produto inserido com sucesso",
					produtoCriado: {
						nome: req.body.nome,
						preco: req.body.preco,
						imagem_produto: req.file.path,
						request: {
							tipo: "GET",
							descricao: "Retorna todos produtos já criados",
							url:
								"http://localhost:3000/produtos"
						}		
					}

				}

				return res.status(201).send(response);
			}
		);
	});
});

//Altera um produto
router.patch("/", (req, res, next) => {
	mysql.getConnection((error, conn) => {
		if (error) {return res.status(500).send({ error: error })}
		conn.query(
			`UPDATE produtos
				SET nome 			= ?,
					preco			= ?
				WHERE idprodutos 	= ?`,
			[req.body.nome, req.body.preco, req.body.id_produto],

			(error, result, field) => {
				conn.release();

				if (error) {
					return res.status(500).send({ error: error });
				}

				const response = {
					produtoAtualizado: {
						id_produto: req.body.idprodutos,
						nome: req.body.nome,
						preco: req.body.preco,
						request: {
							tipo: "GET",
							descricao: "Retorna dados de um produto específico",
							url: "http://localhost:3000/produtos/" + req.body.idprodutos		
						}
							
					}

				}
				return res.status(202).send(response);
			}
		);
	});
});

//Exclui um produto
router.delete("/", (req, res, next) => {
	mysql.getConnection((error, conn) => {
		if (error) {
			return res.status(500).send({ error: error });
		}
		conn.query(
			`DELETE FROM produtos 
				WHERE idprodutos =  ?`,

			[req.body.id_produto],

			(error, result, field) => {
				conn.release();

				if (error) {return res.status(500).send({ error: error });}
				

				const response = {
					mensagem: "Produto removido com sucesso",
					produtoRemovido: {
						id_produto: req.body.idprodutos,
						nome: req.body.nome,
						preco: req.body.preco,
						request: {
							tipo: "POST",
							descricao: "Insere um produto",
							url: "http://localhost:3000/produtos",
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
