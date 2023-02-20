from pymerkle import MerkleTree
def func():
          tree = MerkleTree()

          # Populate tree with some records
          for record in [b'foo', b'bar', b'baz', b'qux', b'quux']:
              tree.encrypt(record)

          # Prove and verify encryption of "bar"
          challenge = b'485904129bdda5d1b5fbc6bc4a82959ecfb9042db44dc08fe87e360b0a3f2501'
          proof = tree.generate_audit_proof(challenge)
          proof.verify()

          # Save current tree state
          state = tree.get_root_hash()

          # Append further leaves
          for record in [b'corge', b'grault', b'garlpy']:
              tree.encrypt(record)

          # Prove and verify saved state
          proof = tree.generate_consistency_proof(challenge=state)
          a=proof.verify()
          return ("teste oficial" , a)
print(func())


    