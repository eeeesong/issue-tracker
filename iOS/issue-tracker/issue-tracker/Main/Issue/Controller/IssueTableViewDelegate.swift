//
//  IssueTableViewDelegate.swift
//  issue-tracker
//
//  Created by jinseo park on 6/21/21.
//

import UIKit

class IssueTableViewDelegate: NSObject, UITableViewDelegate {
    
    typealias CellActionHandler = (Int, CellAction) -> Void
    private var cellActionHandler: CellActionHandler
    typealias CellSelectHandler = (Int) -> Void
    private var cellSelectHandler: CellSelectHandler
    private var cellHeight: CGFloat
    
    init(cellActionHandler: @escaping CellActionHandler,
        cellSelectHandler: @escaping CellSelectHandler,
        cellHeight: CGFloat) {
        self.cellActionHandler = cellActionHandler
        self.cellSelectHandler = cellSelectHandler
        self.cellHeight = cellHeight
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return self.cellHeight
    }
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let deleteAction = UIContextualAction(style: .destructive,
                                              title: CellAction.delete.buttonTitle()) { [weak self] _, _, _ in
            self?.cellActionHandler(indexPath.row, .delete)
        }
        deleteAction.image = UIImage(systemName: "trash")
        
        let closeAction = UIContextualAction(style: .normal,
                                             title: CellAction.close.buttonTitle()) { [weak self] _, _, _ in
            self?.cellActionHandler(indexPath.row, .close)
        }
        closeAction.image = UIImage(systemName: "archivebox")
        
        return UISwipeActionsConfiguration(actions: [closeAction, deleteAction])
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.cellSelectHandler(indexPath.row)        
    }
}
