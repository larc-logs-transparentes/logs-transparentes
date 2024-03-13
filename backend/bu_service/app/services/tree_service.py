from app.adapter import tlmanager_adapter

import logging


def commit_all_trees():
    trees = tlmanager_adapter.get_trees()['trees']
    trees.remove('global_tree')

    logging.info(f"Trying to commit trees: {trees}")

    commited_trees = []
    for tree in trees:
        request = tlmanager_adapter.commit_tree(tree)
        if request.status_code != 200:
            logging.error(f"Failed to commit tree {tree}")
        else:
            commited_trees.append(tree)
            logging.debug(f"Tree {tree} commited")
    logging.info(f"Commited trees: {commited_trees}")
    return commited_trees
