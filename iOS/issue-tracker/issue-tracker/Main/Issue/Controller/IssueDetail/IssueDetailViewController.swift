//
//  IssueDetailViewController.swift
//  issue-tracker
//
//  Created by jinseo park on 6/23/21.
//

import Foundation
import UIKit

class IssueDetailViewController: UIViewController {
    
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
    
    private lazy var issueDetailTableHeaderView: IssueDetailTableHeaderView = {
        let headerView = IssueDetailTableHeaderView()
        headerView.setNeedsLayout()
        headerView.translatesAutoresizingMaskIntoConstraints = false
        return headerView
    }()
    
    private var issueNumber: Int?
    private var issueDetailTableViewDelegate: IssueDetailTableViewDelegate?
    private var issueDetailTableViewDataSource: IssueDetailTableViewDataSource?
    private var networkManager: NetworkManagerOperations?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor.white
        addNavigationItems()
        addTableView()
        setHeaderView()
        setTableViewSupporters()
        setNetworkManager()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        guard let number = self.issueNumber else { return }
        loadDetailIssue(for: number)
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
    }
    
    private func setHeaderView() {
        issueDetailTableView.tableHeaderView = issueDetailTableHeaderView
        
        NSLayoutConstraint.activate([
            issueDetailTableHeaderView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            issueDetailTableHeaderView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            issueDetailTableHeaderView.topAnchor.constraint(equalTo: issueDetailTableView.topAnchor),
            issueDetailTableHeaderView.heightAnchor.constraint(equalTo: issueDetailTableView.heightAnchor, multiplier: 0.1416)
        ])
        
        issueDetailTableHeaderView.backgroundColor = UIColor.white
        
        
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
    }
    
    private func setNetworkManager() {
        let loginInfo = LoginInfo.shared
        guard let jwt = loginInfo.jwt else { return }
        let headers = [Header.authorization.key(): jwt.description]
        networkManager = NetworkManager(baseAddress: EndPoint.baseAddress, headers: headers)
    }
    
    private func presentAlert(with errorMessage: String) {
        DispatchQueue.main.async {
            let alert = AlertFactory.create(body: errorMessage)
            self.present(alert, animated: true, completion: nil)
        }
    }
}


//MARK: - Network Methods
extension IssueDetailViewController {
    private func loadDetailIssue(for id: Int) {
        let issueListEndpoint = EndPoint.issue.path(with: id)
        networkManager?.get(endpoint: issueListEndpoint, queryParameters: nil,
                            completion: { [weak self] (result: Result<IssueDetailDTO, NetworkError>) in
            switch result {
            case .success(let result):
                guard let issueDetail = result.data else { return }

                DispatchQueue.main.async {
                    self?.issueDetailTableHeaderView.configure(title: issueDetail.title, issueNumber: issueDetail.issueNumber, status: issueDetail.status, createTime: issueDetail.createdDate, aurthor: issueDetail.author.name)
                    self?.issueDetailTableView.reloadData()
                }
            case .failure(let error):
                self?.presentAlert(with: error.description)
            }
        })
    }
}
