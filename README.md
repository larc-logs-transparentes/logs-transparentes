# TL-Election - Transparent Logs for election
Merkle tree-based system to improve transparency and auditability of elections.

## Overview

This prototype is applied to the Brazilian election. It transparently stores election critical information, such as logs and "Boletins de Urna" (the result from each polling station). Thus any user can verify their integrity.

* SBSeg 2022: ([Article](https://sol.sbc.org.br/index.php/sbseg_estendido/article/view/21696/21520)) ([Video](https://youtu.be/gRLXQXpbc5s "SBSeg"))


## Setup
Instruction to install and use [here](./install.md).


## Functionalities

<b>Verify BU integrity</b>

Allows users to inspect a desired BU (e.g., votes recorded) and verify its inclusion proof. The color of the lock icon represent the result.


<center>

| Valid Proof | Invalid Proof |
| :-------------: |:-------------:|
|![cad-verde](https://user-images.githubusercontent.com/77642873/180626237-60dc5438-43f3-436a-8374-c0d685b5d4a6.png)|![cad-vermelho](https://user-images.githubusercontent.com/77642873/180626247-1b7bfdee-68e1-4130-84de-d566fe12fafe.png)|


</center>   

![bu_verificar](https://user-images.githubusercontent.com/28439483/182242126-3c9efccb-c449-413d-8b38-ccbb552bec15.png)

<b> Global tree roots </b>

Allows monitors to see all published global roots and check their consistency.

![Histórico da árvore](https://user-images.githubusercontent.com/77642873/219463486-38a39714-b0ec-4205-9c09-1e8f5fd32278.png)
