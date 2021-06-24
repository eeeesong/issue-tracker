//
//  IssueDetailTableViewDataSource.swift
//  issue-tracker
//
//  Created by jinseo park on 6/23/21.
//

import Foundation
import UIKit
final class IssueDetailTableViewDataSource: NSObject, UITableViewDataSource {
    
    private(set) var comments = [Comment]()
    
    func update(comments: [Comment]) {
        self.comments = comments
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        self.comments.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cellID = IssueDetailTableViewCell.reuseID
        let cell = tableView.dequeueReusableCell(withIdentifier: cellID) as? IssueDetailTableViewCell ?? IssueDetailTableViewCell()
        let comment = comments[indexPath.row]
        cell.configure(name: comment.author.name, description: comment.description ?? "", imageUrl: comment.author.imageUrl, createdDate: comment.createdDate)
        return cell
    }
}
