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
    private var cellHeight: CGFloat
    
    
    //선택한 index = Int, DataSource에서 해당 index의 Issue Number를 찾고 IssueTableViewController에서 네비게이션뷰컨을 통해서 해당 issueNum을 넘긴다.
    
//    typealias CellSelectHandler = (Int) -> Void
//    private var cellSelectHandler: CellSelectHandler
    
    init(cellActionHandler: @escaping CellActionHandler,  cellHeight: CGFloat) {
        self.cellActionHandler = cellActionHandler
        self.cellHeight = cellHeight
    }
        
    func setCellSelectionHandler(_ handler: @escaping CellActionHandler) {
        self.cellActionHandler = handler
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
        //close는 아무것도아님. 일단 지정.
        self.cellActionHandler(indexPath.row
                               , .close)
//        print("clicked: ", issues[indexPath.row])
        //navigation
    }
}
