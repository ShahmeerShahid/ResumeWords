import pickle, pkgutil
# from sklearn.feature_extraction.text import CountVectorizer

class TFIDFModel():
    def __init__(self):
        self.cv = pickle.load(open("cv.sav", "rb")) # CountVectorizer
        self.transformer = pickle.load(open("transformer.sav", "rb"))

    def getKeywords(self, text, num_words=10):
        feature_names = self.cv.get_feature_names()
        tf_idf_vector = self.transformer.transform(self.cv.transform([text]))
        sorted_items = self.sort_coo(tf_idf_vector.tocoo())
        return self.extract_topn_from_vector(feature_names, sorted_items, num_words)


    def sort_coo(self, coo_matrix):
        tuples = zip(coo_matrix.col, coo_matrix.data)
        return sorted(tuples, key=lambda x: (x[1], x[0]), reverse=True)

    def extract_topn_from_vector(self, feature_names, sorted_items, topn=10):
        """get the feature names and tf-idf score of top n items"""
        
        #use only topn items from vector
        sorted_items = sorted_items[:topn]

        score_vals = []
        feature_vals = []

        for idx, score in sorted_items:
            fname = feature_names[idx]
            
            #keep track of feature name and its corresponding score
            score_vals.append(round(score, 3))
            feature_vals.append(feature_names[idx])

        #create a tuples of feature,score
        #results = zip(feature_vals,score_vals)
        results= {}
        for idx in range(len(feature_vals)):
            results[feature_vals[idx]]=score_vals[idx]
        
        return results
    

