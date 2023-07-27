# Logs Transparentes para transparência dos dados
#### Sistema baseado em árvores de Merkle para promover maior transparência e auditabilidade dos dados. 

## Visão geral 

Esse protótipo é aplicado à eleição brasileira. Assim, armazena de forma transparente os Boletins de Urna (resultado dos votos registrados na urna), e permite verificar a sua integridade. Também permite recontabilizar o resultado da eleição.

* Publicação na SBSeg 2022 ([Artigo](https://sol.sbc.org.br/index.php/sbseg_estendido/article/view/21696/21520)) ([Vídeo](https://youtu.be/gRLXQXpbc5s "SBSeg"))


## Instalação
Instruções para instalação e utilização [aqui](https://github.com/larc-logs-transparentes/logs-transparentes/install.md)

## Operações

<b>
Consultar e Verificar BU
</b>


Permite ao usuário encontrar o BU desejado, selecioná-lo, e acessar informações adicionais sobre ele (e.g., votos registrados na urna).

Também é possível verificar a sua prova de inclusão, atestando a sua integridade. O resultado é evidenciado pelas imagens abaixo:

<center>

| Prova válida | Prova Inválida |
| :-------------: |:-------------:|
|![cad-verde](https://user-images.githubusercontent.com/77642873/180626237-60dc5438-43f3-436a-8374-c0d685b5d4a6.png)|![cad-vermelho](https://user-images.githubusercontent.com/77642873/180626247-1b7bfdee-68e1-4130-84de-d566fe12fafe.png)|

</center>   

![bu_verificar](https://user-images.githubusercontent.com/28439483/182242126-3c9efccb-c449-413d-8b38-ccbb552bec15.png)



<b> Monitoração da árvore</b>

Permite aos monitores que verifiquem as provas de consistência na Merkle Tree, monitorando as alterações na raiz da árvore. 


![monitorar](https://user-images.githubusercontent.com/28439483/182241946-667c374f-6dc7-4207-a9fc-a0d2d97cb7ab.png)


<b> Reapuração </b>

Permite recalcular os votos da eleição. Ao se iniciar a recontabilização, todos os BUs serão baixados do banco de dados. Então, as seguintes verificações serão realizadas:

* Prova de inclusão do BU;
* Comparação entre a quantidade de BUs recebidas com a quantidade de folhas na Merkle Tree.

Se não houver erros, o resultado final será exibido.

![recontabilizacao](https://user-images.githubusercontent.com/28439483/182241971-d1850ecb-62df-4b38-b32c-a08cb40a7e4d.png)
