//
//  IssueDetailTableViewDataSource.swift
//  issue-tracker
//
//  Created by jinseo park on 6/23/21.
//

import Foundation
import UIKit
final class IssueDetailTableViewDataSource: NSObject, UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        5
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        UITableViewCell()
    }
    
    
}
