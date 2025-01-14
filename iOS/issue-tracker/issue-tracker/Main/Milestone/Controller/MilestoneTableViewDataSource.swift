//
//  MilestoneTableViewDataSource.swift
//  issue-tracker
//
//  Created by jinseo park on 6/18/21.
//

import UIKit

class MilestoneTableViewDataSource: NSObject, UITableViewDataSource {
    
    private(set) var milestones = [MileStone]()
    
    func update(milestones: [MileStone]) {
        self.milestones = milestones
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return milestones.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellID = MileStoneTableViewCell.reuseID
        let cell = tableView.dequeueReusableCell(withIdentifier: cellID) as? MileStoneTableViewCell ?? MileStoneTableViewCell()
        
        let milestone = milestones[indexPath.row]
        
        cell.configure(title: milestone.title, description: milestone.description ?? "", dueDate: milestone.dueDate ?? "")
        return cell
    }
}
