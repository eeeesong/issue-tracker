//
//  LabelControlViewController.swift
//  issue-tracker
//
//  Created by Song on 2021/06/18.
//

import UIKit

class LabelControlViewController: UIViewController {

    private lazy var topMenuView: TopMenuView = {
        let topMenuView = TopMenuView()
        topMenuView.configure(withTitle: sceneTitle, rightButton: saveButton, leftButton: cancelButton)
        topMenuView.translatesAutoresizingMaskIntoConstraints = false
        return topMenuView
    }()
    
    private lazy var saveButton: ImageBarButton = {
        let button = ImageBarButton()
        button.configure(with: "", "저장")
        button.translatesAutoresizingMaskIntoConstraints = false
        button.addTarget(self, action: #selector(saveButtonTouched), for: .touchUpInside)
        changeSaveButtonEnableStatus(baseOn: titleTextfield)
        return button
    }()
    
    private lazy var cancelButton: ImageBarButton = {
        let button = ImageBarButton()
        button.configure(with: "chevron.backward", "취소")
        button.moveImageToLeft()
        button.translatesAutoresizingMaskIntoConstraints = false
        button.addTarget(self, action: #selector(cancelButtonTouched), for: .touchUpInside)
        return button
    }()
    
    private lazy var labelEditStackView: MultipleLineInputStackView = {
        let viewWidth = view.frame.width
        let stackViewFrame = CGRect(x: 0, y: 0, width: viewWidth, height: singleLineHeight * 3)
        let stackView = MultipleLineInputStackView(frame: stackViewFrame)
        
        let titleInputItem = InputLineItem(category: "제목", inputView: titleTextfield)
        let descriptionInputItem = InputLineItem(category: "설명", inputView: descriptionTextfield)
        let backgroundColorInputItem = InputLineItem(category: "배경색", inputView: backgroundLabel)
        stackView.configure(with: [titleInputItem, descriptionInputItem, backgroundColorInputItem])
        
        guard let backgroundEditView = stackView.arrangedSubviews.last else { return stackView }
        
        backgroundEditView.addSubview(randomColorButton)
        NSLayoutConstraint.activate([
            randomColorButton.widthAnchor.constraint(equalToConstant: singleLineHeight * 0.9),
            randomColorButton.heightAnchor.constraint(equalTo: randomColorButton.safeAreaLayoutGuide.widthAnchor),
            randomColorButton.trailingAnchor.constraint(equalTo: backgroundEditView.safeAreaLayoutGuide.trailingAnchor, constant: -spacing),
            randomColorButton.centerYAnchor.constraint(equalTo: backgroundEditView.safeAreaLayoutGuide.centerYAnchor)
        ])
        return stackView
    }()
    
    private lazy var titleTextfield: UITextField = {
        let textField = UITextField()
        textField.placeholder = "(필수 입력)"
        return textField
    }()
    
    private lazy var descriptionTextfield: UITextField = {
        let textField = UITextField()
        textField.placeholder = "(선택 사항)"
        return textField
    }()
    
    private lazy var backgroundLabel: UILabel = {
        let label = UILabel()
        label.text = "#000000"
        return label
    }()
    
    private lazy var randomColorButton: UIButton = {
        let button = UIButton()
        let refreshImage = UIImage(systemName: "arrow.clockwise")
        button.setImage(refreshImage, for: .normal)
        button.tintColor = UIColor.black
        button.translatesAutoresizingMaskIntoConstraints = false
        button.addTarget(self, action: #selector(randomColorButtonTouched), for: .touchUpInside)
        return button
    }()
    
    private lazy var previewLabel: LabelView = {
        let labelView = LabelView()
        let colorText = backgroundLabel.text ?? "#000000"
        let hex = HexColorCode(from: colorText)
        let titleText = titleTextfield.isEmpty() ? "레이블" : titleTextfield.text
        labelView.configure(with: hex, titleText)
        labelView.translatesAutoresizingMaskIntoConstraints = false
        return labelView
    }()
    
    private lazy var singleLineHeight: CGFloat = {
        return view.frame.height * 0.05
    }()
    
    private lazy var spacing: CGFloat = {
        return singleLineHeight * 0.5
    }()
    
    private var currentLabel: Label?
    private var sceneTitle: String?
    private var saveOperation: ((Label) -> Void)?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureViews()
        setTitleTextFieldSupporter()
    }
    
    private func configureViews() {
        view.backgroundColor = Colors.background
        addTopMenu()
        addEditStackView()
        addLabelPreview()
    }
        
    private func addTopMenu() {
        view.addSubview(topMenuView)
        
        NSLayoutConstraint.activate([
            topMenuView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            topMenuView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            topMenuView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: spacing),
            topMenuView.heightAnchor.constraint(equalToConstant: singleLineHeight)
        ])
    }
    
    private func addEditStackView() {
        view.addSubview(labelEditStackView)
        
        NSLayoutConstraint.activate([
            labelEditStackView.heightAnchor.constraint(equalToConstant: singleLineHeight * 3),
            labelEditStackView.topAnchor.constraint(equalTo: topMenuView.safeAreaLayoutGuide.bottomAnchor, constant: 40),
            labelEditStackView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            labelEditStackView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor)
        ])
    }

    private func addLabelPreview() {
        let backgroundView = UIView()
        backgroundView.backgroundColor = UIColor.systemGray5
        backgroundView.layer.cornerRadius = view.frame.width * 0.07
        backgroundView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(backgroundView)
        backgroundView.addSubview(previewLabel)

        NSLayoutConstraint.activate([
            backgroundView.widthAnchor.constraint(equalToConstant: view.frame.width - spacing * 2),
            backgroundView.heightAnchor.constraint(equalTo: backgroundView.safeAreaLayoutGuide.widthAnchor, multiplier: 0.75),
            backgroundView.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor),
            backgroundView.topAnchor.constraint(equalTo: labelEditStackView.safeAreaLayoutGuide.bottomAnchor, constant: 24),
            previewLabel.centerXAnchor.constraint(equalTo: backgroundView.safeAreaLayoutGuide.centerXAnchor),
            previewLabel.centerYAnchor.constraint(equalTo: backgroundView.safeAreaLayoutGuide.centerYAnchor)
        ])
    }
    
    private func setTitleTextFieldSupporter() {
        titleTextfield.delegate = self
    }
    
    func configure(withTitle sceneTitle: String, currentLabel: Label?) {
        self.sceneTitle = sceneTitle
        self.currentLabel = currentLabel
        
        setUpCurrentLabelInfo()
    }
    
    private func setUpCurrentLabelInfo() {
        guard let currentLabel = currentLabel else { return }
        titleTextfield.text = currentLabel.title
        descriptionTextfield.text = currentLabel.body
        backgroundLabel.text = currentLabel.hexColorCode
    }
    
    func setSaveOperation(_ operation: @escaping (Label) -> Void) {
        self.saveOperation = operation
    }
    
    @objc private func cancelButtonTouched(_ sender: UIBarButtonItem) {
        dismiss(animated: true, completion: nil)
    }
    
    @objc func saveButtonTouched(_ sender: UIBarButtonItem) {
        guard let labelTitle = titleTextfield.text,
              let colorCode = backgroundLabel.text,
              let saveOperation = saveOperation else { return }
        
        let label = Label(id: currentLabel?.id ?? -1,
                          title: labelTitle,
                          body: descriptionTextfield.text ?? "",
                          hexColorCode: colorCode)
        
        saveOperation(label)
        dismiss(animated: true, completion: nil)
    }
    
    @objc private func randomColorButtonTouched(_ sender: UIButton) {
        let hexColor = randomColor()
        backgroundLabel.text = hexColor
        changePreviewLabel()
    }
    
    private func randomColor() -> String {
        let colorRange = 0...255
        let randomRed = Int.random(in: colorRange)
        let randomGreen = Int.random(in: colorRange)
        let randomBlue = Int.random(in: colorRange)
        
        let hexRed = String(randomRed, radix: 16)
        let hexGreen = String(randomGreen, radix: 16)
        let hexBlue = String(randomBlue, radix: 16)
        
        return "#\(hexRed)\(hexGreen)\(hexBlue)"
    }
}

extension LabelControlViewController: UITextFieldDelegate {
    func textFieldDidChangeSelection(_ textField: UITextField) {
        changeSaveButtonEnableStatus(baseOn: textField)
        changePreviewLabel()
    }
    
    private func changeSaveButtonEnableStatus(baseOn textField: UITextField) {
        DispatchQueue.main.async {
            self.saveButton.isEnabled = !textField.isEmpty()
        }
    }
    
    private func changePreviewLabel() {
        let hexColorString = backgroundLabel.text ?? "#000000"
        let hex = HexColorCode(from: hexColorString)
        let titleText = titleTextfield.isEmpty() ? "레이블" : titleTextfield.text
        previewLabel.configure(with: hex, titleText)
    }
}
