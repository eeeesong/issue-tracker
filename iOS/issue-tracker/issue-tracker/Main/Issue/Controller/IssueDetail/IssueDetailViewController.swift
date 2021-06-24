//
//  IssueDetailViewController.swift
//  issue-tracker
//
//  Created by jinseo park on 6/23/21.
//

import Foundation
import UIKit

class IssueDetailViewController: UIViewController {
    
    private lazy var issueDetailHeaderView: IssueDetailTableHeaderView = {
        let headerView = IssueDetailTableHeaderView()
        headerView.translatesAutoresizingMaskIntoConstraints = false
        return headerView
    }()
    
    private lazy var issueDetailTableView: UITableView = {
        let tableView = UITableView(frame: .zero, style: .grouped)
        //        let cellID = IssueTableViewCell.reuseID
        //        tableView.register(IssueTableViewCell.self, forCellReuseIdentifier: cellID)
        tableView.backgroundColor = Colors.background
        tableView.translatesAutoresizingMaskIntoConstraints = false
        return tableView
    }()
    
    private lazy var backToIssuesButton: ImageBarButton = {
        let button = ImageBarButton()
        button.configure(with: "chevron.backward", "목록")
        button.moveImageToLeft()
        button.addTarget(self, action: #selector(backToIssuesTouched), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private lazy var editIssueButton: ImageBarButton = {
        let button = ImageBarButton()
        button.configure(with: "ellipsis", "")
        return button
    }()
    
    private var issueNumber: Int?
    private var issueDetailTableViewDelegate: IssueDetailTableViewDelegate?
    private var issueDetailTableViewDataSource: IssueDetailTableViewDataSource?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor.white
        addNavigationItems()
        addTableView()
        setTableViewSupporters()
        //issueDetailHeaderView.configure(title: "테스트트트", issueNumber: 3, status: true, createTime: "몰라")
        
        guard let number = self.issueNumber else { return }
        print("안녕? 내 issuenumber는? =",number)
    }
        
    private func addTableView() {
        view.addSubview(issueDetailTableView)
        NSLayoutConstraint.activate([
            issueDetailTableView.topAnchor.constraint(equalTo: view.topAnchor),
            issueDetailTableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            issueDetailTableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            issueDetailTableView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
    
    private func setTableViewSupporters() {
        issueDetailTableViewDataSource = IssueDetailTableViewDataSource()
        issueDetailTableViewDelegate = IssueDetailTableViewDelegate()
        issueDetailTableView.delegate = issueDetailTableViewDelegate
        issueDetailTableView.dataSource = issueDetailTableViewDataSource
        
        let headerView = IssueDetailTableHeaderView()
        headerView.translatesAutoresizingMaskIntoConstraints = false
        issueDetailTableView.tableHeaderView = headerView
        
        NSLayoutConstraint.activate([
            headerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            headerView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            headerView.topAnchor.constraint(equalTo: issueDetailTableView.topAnchor),
            headerView.heightAnchor.constraint(equalTo: issueDetailTableView.heightAnchor, multiplier: 0.1416)
        ])
        
        headerView.backgroundColor = UIColor.white
        headerView.configure(title: "테테테", issueNumber: 3, status: true, createTime: "2021-06-01", aurthor: "잭슨")
        
        headerView.layoutIfNeeded()
        
    }
    
    @objc func backToIssuesTouched(_ sender: UIButton) {
        navigationController?.popViewController(animated: true)
        navigationController?.navigationBar.prefersLargeTitles = true
    }
    
    func setIssuNumber(_ issueNumber: Int) {
        self.issueNumber = issueNumber
    }
    
    private func addNavigationItems() {
        navigationItem.leftBarButtonItem = UIBarButtonItem(customView: backToIssuesButton)
        navigationController?.navigationBar.prefersLargeTitles = false
        //        navigationItem.rightBarButtonItem =
        //            UIBarButtonItem(customView: editIssueButton)
        //        navigationItem.titleView = issues.get 통신의 issueTitle
    }
    
    
}

