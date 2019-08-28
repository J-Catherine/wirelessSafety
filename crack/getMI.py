with open("dic/wordlist","r")as fin:
	lines = fin.readlines()
with open("dic/MI-wordlist","w") as fout:
	out = []
	for head in ["","MI","mi","xiaomi","XiaoMi","XiaoMI"]:
		for each in lines:
			out.append(head+each)
	fout.writelines(out)
