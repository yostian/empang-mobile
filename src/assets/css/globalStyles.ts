import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // bukan string bebas
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 20,
    textAlign: 'center',
  },
  leaderboardContainer: {
    width: width * 0.8,
    maxWidth: 800,
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginCard: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: '100%',
  },
  startButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default globalStyles;
